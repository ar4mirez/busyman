'use strict';

const Lab = require('lab');
const Code = require('code');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;
const expect = Code.expect;

const Manager = require('../lib/manager');

describe('Manager', () => {

    let manager;

    beforeEach((done) => {

        manager = new Manager({ mode: 'test' });
        return done();
    });

    it('should instantiate the manager object.', (done) => {

        expect(manager).to.exists();
        expect(manager).to.be.an.instanceof(Manager);
        return done();
    });

    it('should fail if not connection passed.', (done) => {

        expect(manager.addQueue('0x00101')).to.be.an.instanceof(Error);
        return done();
    });

    it('should add a new queue to the manager.', (done) => {

        manager.addQueue('0x00101', { redis: process.env.REDIS_URI });
        expect(manager.queues).to.have.a.length(1);
        return done();
    });

    it('should remove a queue from the manager.', (done) => {

        manager.addQueue('0x00101', { redis: process.env.REDIS_URI });
        expect(manager.queues).to.have.a.length(1);
        manager.removeQueue('0x00101');
        expect(manager.queues).to.have.a.length(0);
        return done();
    });

    it('should create a job in a queue.', (done) => {

        manager.addQueue('0x00101', { redis: process.env.REDIS_URI });
        manager.queues['0x00101'].createJob('jobId1', { foo: 'bar'}).save();
        manager.queues['0x00101'].createJob('jobId2', { baz: 'bip'}).save();

        expect(manager.queues['0x00101'].testMode.jobs).to.have.a.length(2);
        expect(manager.queues['0x00101'].testMode.jobs[0].type).to.equal('jobId1');
        expect(manager.queues['0x00101'].testMode.jobs[1].data).to.deep.equal({ baz: 'bip'});

        return done();
    });

    // it('should create multiple jobs for multiple queues.', (done) => {
    //
    //     manager.addQueue('0x00101', { redis: process.env.REDIS_URI + '/15' });
    //     manager.addQueue('0x00102', { redis: process.env.REDIS_URI + '/16' });
    //
    //     manager.queues['0x00101'].createJob('jobId1', { foo: 'bar'}).save();
    //     manager.queues['0x00101'].createJob('jobId2', { baz: 'bip'}).save();
    //     manager.queues['0x00102'].createJob('jobId1', { foo: 'bar'}).save();
    //     manager.queues['0x00102'].createJob('jobId2', { baz: 'bip'}).save();
    //     // console.log(manager.queues);
    //
    //     // expect(manager.queues['0x00101'].testMode.jobs).to.have.a.length(2);
    //     // expect(manager.queues['0x00102'].testMode.jobs).to.have.a.length(2);
    //     // expect(manager.queues['0x00101'].testMode.jobs[0].type).to.equal('jobId1');
    //     // expect(manager.queues['0x00102'].testMode.jobs[0].type).to.equal('jobId1');
    //     // expect(manager.queues['0x00101'].testMode.jobs[1].data).to.deep.equal({ baz: 'bip'});
    //     // expect(manager.queues['0x00102'].testMode.jobs[1].data).to.deep.equal({ baz: 'bip'});
    //
    //     return done();
    // });
});
