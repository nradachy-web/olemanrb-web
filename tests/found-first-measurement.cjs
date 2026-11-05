const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const { randomUUID } = require('node:crypto');
const source = fs.readFileSync(__dirname + '/../public/found-first-measurement-20261104.js', 'utf8');
const quote = '/wp-json/modern-apex/v1/quote';
const id = randomUUID();

function environment({ url = 'https://olemanrb.com/?utm_source=chatgpt&utm_medium=cpc&utm_campaign=tree_removal', referrer = '', privacy = false, testMode = false, storage = new Map(), response = {success:true}, status = 200, reject = false, storageBlocked = false } = {}) {
  const loc = new URL(url + (testMode ? '&apx_test=1' : ''));
  const calls = [], scripts = [], listeners = {}, mutations = [], requests = [];
  const context = { URL, URLSearchParams, TextEncoder, Promise, Date, Object, String, JSON, crypto: {randomUUID}, location: loc, navigator: {globalPrivacyControl:privacy},
    localStorage: {getItem:k=>{if(storageBlocked)throw Error('blocked');return storage.get(k)||null;},setItem:(k,v)=>{if(storageBlocked)throw Error('blocked');storage.set(k,v);},removeItem:k=>storage.delete(k)},
    document: {referrer,readyState:'loading',cookie:'',head:{appendChild:s=>scripts.push(s)},createElement:()=>({}),addEventListener:(n,cb)=>listeners[n]=cb,getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[]},
    history:{ pushState(_s,_t,path){const next=new URL(path,loc);loc.href=next.href;},replaceState(_s,_t,path){const next=new URL(path,loc);loc.href=next.href;} },
    addEventListener:(n,cb)=>listeners[n]=cb,
    fetch:(input,options)=>{requests.push({input,options});return reject ? Promise.reject(Error('network')) : Promise.resolve({ok:status<300,clone:()=>({json:()=>Promise.resolve(response)}),json:()=>Promise.resolve(response)});},
    requestAnimationFrame:cb=>cb(), MutationObserver:class{constructor(cb){mutations.push(cb)}observe(){}},
  };
  context.window=context;
  vm.createContext(context);vm.runInContext(source,context);
  const events=()=>context.oaiq?.q?.filter(a=>a[0]==='measure')||[];
  const submit=async(body={request_id:id,name:'Test',phone:'6162325300',email:'test@example.com',message:'Keep my words',botcheck:''})=>{
    const result=await context.fetch(quote,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    await new Promise(r=>setImmediate(r));return result;
  };
  return {context,calls,scripts,listeners,requests,events,submit,storage};
}
test('pixel loads once with exact ID and production debug off; page view is not a lead',()=>{
 const e=environment();vm.runInContext(source,e.context);
 assert.equal(e.scripts.length,1);assert.equal(e.context.oaiq.q[0][1].pixelId,'BnyAXPbRSfvwJxYxbUGsX1');assert.equal(e.context.oaiq.q[0][1].debug,false);
 assert.equal(JSON.stringify(e.events().map(x=>x[1])),JSON.stringify(['page_viewed']));
});
test('confirmed success preserves response and records one stable lead with no personal fields',async()=>{
 const e=environment(); const result=await e.submit();assert.equal((await result.json()).success,true);
 const leads=e.events().filter(x=>x[1]==='lead_created');assert.equal(leads.length,1);assert.equal(leads[0][3].event_id,id);
 assert.equal(JSON.stringify(leads[0]).includes('test@example.com'),false);assert.equal(leads[0][3].opt_out,true);
 assert.match(JSON.parse(e.requests[0].options.body).message,/Keep my words\n\nWebsite source details/);
});
test('repeated successes and reloads cannot count the same request twice',async()=>{
 const e=environment();await e.submit();await e.submit();assert.equal(e.events().filter(x=>x[1]==='lead_created').length,1);
 const f=environment({storage:e.storage});await f.submit();assert.equal(f.events().filter(x=>x[1]==='lead_created').length,0);
});
for(const config of [{response:{success:false}},{response:{success:'true'}},{status:500},{response:null}]) test('failed or malformed response does not create a lead '+JSON.stringify(config),async()=>{
 const e=environment(config);await e.submit();assert.equal(e.events().filter(x=>x[1]==='lead_created').length,0);
});
test('network error remains an error and creates no conversion',async()=>{const e=environment({reject:true});await assert.rejects(e.submit());assert.equal(e.events().length,1)});
test('honeypot success cannot count a conversion or be enriched',async()=>{const e=environment();await e.submit({request_id:id,botcheck:'bot',message:'no'});assert.equal(e.events().length,1);assert.equal(JSON.parse(e.requests[0].options.body).message,'no')});
test('request UUID is required',async()=>{const e=environment();await e.submit({request_id:'bad',message:'x'});assert.equal(e.events().length,1)});
test('privacy signal disables SDK, stored attribution and all events without breaking delivery',async()=>{const e=environment({privacy:true});await e.submit();assert.equal(e.scripts.length,0);assert.equal(e.events().length,0);assert.equal(e.storage.size,0);assert.equal(JSON.parse(e.requests[0].options.body).message,'Keep my words')});
test('stored opt out persists and does not enrich quotes',async()=>{const e=environment({storage:new Map([['omr_measurement_opt_out','1']])});await e.submit();assert.equal(e.scripts.length,0);assert.equal(e.events().length,0);assert.equal(JSON.parse(e.requests[0].options.body).message,'Keep my words')});
test('rollout test suppresses measurement without claiming to suppress real form delivery',async()=>{const e=environment({testMode:true});await e.submit();assert.equal(e.events().length,0);assert.equal(e.requests.length,1)});
test('previews and privacy pages do not load the SDK',()=>{for(const url of ['https://nradachy-web.github.io/olemanrb-web/','http://localhost:9874/','https://olemanrb.com/privacy-choices/','https://olemanrb.com/_apex-tracking-20261104/contact/'])assert.equal(environment({url}).scripts.length,0)});
test('SPA navigation records one page view per route and retains the entry source',async()=>{
 const e=environment({referrer:'https://chatgpt.com/c/private-conversation'});e.context.history.pushState({},'', '/contact/');e.context.history.replaceState({},'', '/contact/');await e.submit();
 assert.equal(e.events().filter(x=>x[1]==='page_viewed').length,2); const msg=JSON.parse(e.requests[0].options.body).message;
 assert.match(msg,/Landing page: \/\n/);assert.match(msg,/Referrer: chatgpt.com/);assert.match(msg,/utm_source: chatgpt/);assert.equal(msg.includes('private-conversation'),false);
});
test('unrelated requests remain byte-identical',async()=>{const e=environment();const options={method:'POST',body:'{"message":"other"}'};await e.context.fetch('/unrelated',options);assert.equal(e.requests[0].options,options)});
test('long user messages are preserved rather than truncated or rejected by added metadata',async()=>{const e=environment();const msg='é'.repeat(2490);await e.submit({request_id:id,message:msg});assert.equal(JSON.parse(e.requests[0].options.body).message,msg)});
test('disabled storage never blocks the quote or in-memory deduplication',async()=>{const e=environment({storageBlocked:true});await e.submit();await e.submit();assert.equal(e.events().filter(x=>x[1]==='lead_created').length,1)});
test('a phone click is its own custom signal, never a lead',()=>{
 const e=environment();e.listeners.click({isTrusted:true,target:{closest:()=>({tagName:'A',getAttribute:()=> 'tel:+16162325300'})}});
 const event=e.events().at(-1);assert.equal(event[1],'custom');assert.equal(event[3].custom_event_name,'phone_link_clicked');assert.equal(e.events().some(x=>x[1]==='lead_created'),false);
});
test('untrusted synthetic phone clicks do not send events',()=>{const e=environment();e.listeners.click({isTrusted:false,target:{closest:()=>({tagName:'A',getAttribute:()=> 'tel:+16162325300'})}});assert.equal(e.events().length,1)});
