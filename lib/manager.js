'use strict';

const Kue = require('kue');
const Joi = require('joi');

const connectionSchema = Joi.object().keys({
    name: Joi.string().default('queue' + Math.random(1000, 9999)),
    redis: Joi.alternatives().try(
        Joi.string(),
        Joi.object().keys({
            host: Joi.string().default('127.0.0.1'),
            port: Joi.number().default(6379),
            db: Joi.number().min(0).max(16).default(15),
            options: Joi.object()
        })
    ).required()
});

class Manager {
    constructor(options) {

        this.mode = options.mode;
        this.queues = {};
    }
    addQueue(id, options) {

        const connection = Joi.validate(options || {}, connectionSchema);

        if (connection.error) {
            return Error(connection.error);
        }

        const queue = new Kue(connection.value);

        if (this.mode === 'test') {
            queue.testMode.enter();
        }

        this.queues[id] = queue;
    }
    removeQueue(id) {

        delete this.queues[id];
    }
}

module.exports = Manager;
