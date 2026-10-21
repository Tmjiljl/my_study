import test from 'node:test';
import assert from 'node:assert/strict';
import {createCard, scheduleReview, dueCards, addDays, validateCards} from '../src/scheduler.mjs';
const base=()=>createCard({id:'sample_123',subject:'数学',question:'为什么？',answer:'因为连续。'},'2026-10-22');
test('a new card is due today',()=>{assert.equal(base().due,'2026-10-22');});
test('again reschedules for the same day',()=>{const c=scheduleReview(base(),'again','2026-10-22');assert.equal(c.interval,0);assert.equal(c.due,'2026-10-22');assert.equal(c.streak,0);});
test('hard schedules tomorrow',()=>{assert.equal(scheduleReview(base(),'hard','2026-10-22').due,'2026-10-23');});
test('good then easy grows interval',()=>{const a=scheduleReview(base(),'good','2026-10-22');const b=scheduleReview(a,'easy','2026-10-25');assert.equal(a.interval,3);assert.equal(b.interval,7);assert.equal(b.due,'2026-11-01');});
test('month transitions handled correctly',()=>assert.equal(addDays('2026-12-30',3),'2027-01-02'));
test('due cards are ordered and filtered',()=>{const x={...base(),id:'other_123',due:'2026-10-23'};assert.equal(dueCards([x,base()],'2026-10-22').length,1);});
test('validate imported cards and reject duplicates',()=>{assert.equal(validateCards([base()]).length,1);assert.throws(()=>validateCards([base(),base()]),/Duplicate/);});
test('reject malformed input and invalid ratings',()=>{assert.throws(()=>createCard({id:'sample_123',subject:'',question:'Q',answer:'A'}));assert.throws(()=>scheduleReview(base(),'unknown'));});


test('reject impossible imported due dates and allow leap days',()=>{
  const invalid=['2026-02-29','2026-04-31','2026-13-01','0000-01-01','no-date'];
  for(const due of invalid) assert.throws(()=>validateCards([{...base(),due}]),/Invalid due date/);
  assert.equal(validateCards([{...base(),due:'2028-02-29'}])[0].due,'2028-02-29');
  assert.equal(addDays('2028-02-29',1),'2028-03-01');
  assert.throws(()=>addDays('2026-02-29',1),/Invalid ISO date/);
});

test('missing due defaults to creation day and invalid history entries are skipped',()=>{
  const card=base();
  delete card.due;
  card.history=[{date:'2026-02-29',rating:'good'},{date:'2026-10-22',rating:'hard'}];
  const imported=validateCards([card])[0];
  assert.equal(imported.due,'2026-10-22');
  assert.deepEqual(imported.history,[{date:'2026-10-22',rating:'hard'}]);
});
