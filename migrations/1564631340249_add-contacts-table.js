exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('contacts', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        first_name: {
            type: 'text',
            notNull: true,
        },
        last_name: {
            type: 'text',
            notNull: true,
        },
        home_phone: {
            type: 'text',
        },
        mobile_phone: {
            type: 'text',
        },
        work_phone: {
            type: 'text',
        },
        email: {
            type: 'text',
            notNull: true,
        },
        city: {
            type: 'text',
        },
        state: {
            type: 'text',
        },
        postal_code: {
            type: 'integer',
        },
        country: {
            type: 'text',
        },
    })
};

exports.down = (pgm) => {

};
