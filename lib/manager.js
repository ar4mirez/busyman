'use strict';

const Kue = require('kue');

class Manager {
    constructor() {
        this.queues = {};
    }
    addQueue(queue) {
        this.queues[queue.id] = Kue.createQueue({
            
        });
    }
    removeQueue(id) {
        delete this.queues[id];
    }
}

module.exports = Manager;
