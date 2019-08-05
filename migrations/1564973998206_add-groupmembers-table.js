exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('group_members', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        contact_id: {
            type: 'integer',
            notNull: true,
            references: '"contacts"',
        },
        group_id: {
            type: 'integer',
            notNull: true,
            references: '"groups"',
        },
      });
};

exports.down = (pgm) => {

};
