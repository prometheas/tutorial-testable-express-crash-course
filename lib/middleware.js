module.exports = {
    determineTitleForPerson: (req, res, next) => {
        const person = res.locals.person;

        const logger = req.app.get('logger');

        if (person === undefined) {
            logger.error('Uh-oh');
            throw Error('This middleware requires res.locals.person to be defined');
        }

        switch (person.gender) {
            case 'female':
                res.locals.title = 'Ms.';
                break;
            case 'male':
                res.locals.title = 'Mr.';
                break;

            default:
                res.locals.title = 'Hey, ';
        }

        console.info('All looks good with the title', res.locals.title);

        next();
    },

    querySwapi: async (req, res, next) => {
        const swapi = req.app.get('swapi');
        res.locals.person = await swapi.get('people', 1);
        next();
    }
}
