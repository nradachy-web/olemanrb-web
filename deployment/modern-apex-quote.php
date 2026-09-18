<?php
/**
 * Plugin Name: Ole Man RB Website Quotes
 * Description: Connect the static website to the existing Elementor lead workflow.
 */

defined('ABSPATH') || exit;

add_action('rest_api_init', function () {
    register_rest_route('modern-apex/v1', '/quote', [
        'methods' => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'modern_apex_receive_quote',
    ]);
});

function modern_apex_quote_error($status = 503) {
    return new WP_Error('quote_unavailable', 'Please call (616) 232-5300 for help with your request.', ['status' => $status]);
}

function modern_apex_receive_quote(WP_REST_Request $request) {
    $origin = $request->get_header('origin');
    $allowed = ['https://olemanrb.com', 'https://www.olemanrb.com', 'https://nradachy-web.github.io'];
    if ($origin && !in_array($origin, $allowed, true)) {
        return modern_apex_quote_error(403);
    }
    if (strlen($request->get_body()) > 16000 || strpos($request->get_header('content-type'), 'application/json') !== 0) {
        return modern_apex_quote_error(400);
    }
    $input = $request->get_json_params();
    if (!is_array($input)) {
        return modern_apex_quote_error(400);
    }
    if (!empty($input['botcheck'])) {
        return ['success' => true];
    }

    $values = [];
    $limits = ['name' => 120, 'phone' => 40, 'email' => 254, 'location' => 500, 'service' => 100, 'message' => 5000, 'request_id' => 64];
    foreach ($limits as $key => $limit) {
        $value = $input[$key] ?? '';
        if (!is_string($value) || strlen($value) > $limit) {
            return modern_apex_quote_error(400);
        }
        $values[$key] = $key === 'message' ? sanitize_textarea_field($value) : sanitize_text_field($value);
    }
    $digits = preg_replace('/\D/', '', $values['phone']);
    if (strlen($values['name']) < 2 || strlen($digits) < 10 || strlen($digits) > 15 || ($values['email'] && !is_email($values['email']))) {
        return modern_apex_quote_error(400);
    }
    if (!preg_match('/^[a-f0-9-]{36}$/i', $values['request_id'])) {
        return modern_apex_quote_error(400);
    }

    $receipt_key = 'apex_quote_' . hash_hmac('sha256', $values['request_id'], wp_salt());
    if (get_transient($receipt_key) === 'delivered') {
        return ['success' => true];
    }
    $rate_key = 'apex_quote_rate_' . hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? '', wp_salt());
    $attempts = (int) get_transient($rate_key);
    if ($attempts >= 5) {
        return modern_apex_quote_error(429);
    }
    set_transient($rate_key, $attempts + 1, 10 * MINUTE_IN_SECONDS);

    if (!class_exists('ElementorPro\Modules\Forms\Classes\Form_Record')) {
        return modern_apex_quote_error();
    }

    try {
        // Retain the real form ID, field IDs and Make destination used by the old site.
        $elementor = \ElementorPro\Plugin::elementor();
        $elementor->db->switch_to_post(50);
        $document = $elementor->documents->get(50);
        if (!$document) {
            return modern_apex_quote_error();
        }
        $form = \ElementorPro\Modules\Forms\Module::find_element_recursive($document->get_elements_data(), 'c36bae4');
        if (!$form) {
            return modern_apex_quote_error();
        }
        $widget = $elementor->elements_manager->create_element_instance($form);
        $form['settings'] = $widget->get_settings_for_display();
        $settings = &$form['settings'];
        $settings['id'] = $form['id'];
        $settings['form_post_id'] = 50;
        $settings['edit_post_id'] = 50;
        if (empty($settings['webhooks']) || !in_array('webhook', $settings['submit_actions'], true) || !in_array('save-to-database', $settings['submit_actions'], true)) {
            return modern_apex_quote_error();
        }

        // Preserve the original workflow's required contact fields.
        foreach (['service' => 'Service needed', 'details' => 'Message', 'emergency' => 'Emergency', 'request_id' => 'Website request ID'] as $id => $label) {
            $settings['form_fields'][] = [
                'custom_id' => $id,
                'field_type' => $id === 'details' ? 'textarea' : 'text',
                'field_label' => $label,
                'required' => '',
            ];
        }

        $fields = [
            'name' => $values['name'],
            'email' => $values['phone'],
            'message' => $values['email'],
            'field_37bc36d' => 'Phone',
            'field_978d61f' => $values['location'],
            'field_46f07c5' => 'Website',
            'service' => $values['service'],
            'details' => $values['message'],
            'emergency' => !empty($input['emergency']) ? 'Yes' : 'No',
            'request_id' => $values['request_id'],
        ];
        // Elementor strips slashes from incoming values as part of its normal flow.
        $record = new \ElementorPro\Modules\Forms\Classes\Form_Record(wp_slash($fields), $form);
        $handler = new class($form) extends \ElementorPro\Modules\Forms\Classes\Ajax_Handler {
            private $quote_form;
            public function __construct($form) { $this->quote_form = $form; }
            public function get_current_form() { return $this->quote_form; }
        };
        if (!$record->validate($handler)) {
            return modern_apex_quote_error(400);
        }
        $record->process_fields($handler);
        if (!$handler->is_success) {
            return modern_apex_quote_error(400);
        }

        // Capture the source page for the same submission screen the team already uses.
        $_POST['referrer'] = esc_url_raw($request->get_header('referer'));
        $_POST['referer_title'] = 'Ole Man RB Website Quote';
        $record = apply_filters('elementor_pro/forms/record/actions_before', $record, $handler);
        $actions = \ElementorPro\Modules\Forms\Module::instance()->actions_registrar->get();
        $ordered = array_unique(array_merge(['save-to-database'], $settings['submit_actions']));
        foreach ($ordered as $action_name) {
            if (!isset($actions[$action_name])) {
                return modern_apex_quote_error();
            }
            $action = $actions[$action_name];
            try {
                $action->run($record, $handler);
                if (!$handler->is_success) {
                    throw new \Exception('Quote delivery failed.');
                }
                do_action('elementor_pro/forms/actions/after_run', $action, null);
            } catch (\Throwable $error) {
                // Keep diagnostics in Elementor without exposing integration secrets.
                do_action('elementor_pro/forms/actions/after_run', $action, new \Exception('Quote delivery failed.'));
                return modern_apex_quote_error();
            }
        }
        do_action('elementor_pro/forms/new_record', $record, $handler);
        set_transient($receipt_key, 'delivered', DAY_IN_SECONDS);
        return ['success' => true];
    } catch (\Throwable $error) {
        return modern_apex_quote_error();
    }
}
