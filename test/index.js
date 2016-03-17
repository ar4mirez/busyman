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

        manager = new Manager();
        return done();
    });

    it('should instantiate the manager object.', (done) => {

        expect(manager).to.exists();
        expect(manager).to.be.an.instanceof(Manager);
        return done();
    });

    it('should add a new queue to the manager.', (done) => {

        manager.addQueue({ id: '0x00101' });
        expect(manager.queues).to.have.a.length(1);
        return done();
    });

    it('should remove a queue from the manager.', (done) => {

        manager.addQueue({ id: '0x00101' });
        manager.removeQueue('0x00101');
        expect(manager.queues).to.have.a.length(0);
        return done();
    });
});
