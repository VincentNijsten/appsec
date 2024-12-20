import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { coachRouter } from './controller/coach.routes';
import { ploegRouter } from './controller/ploeg.routes';
import { spelersRouter } from './controller/speler.routes';
import { zaalRouter } from './controller/zaal.routes';
import { trainingSessionRouter } from './controller/trainingSessions.routes';
import { userRouter } from './controller/user.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import { connect } from 'node:http2';


const app = express();
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        connectSrc: ['self', 'https://api.ucll.be'],
       
    },
}));
dotenv.config();
const port = process.env.APP_PORT || 3000;
app.use(helmet());

app.use(cors());
app.use(bodyParser.json());

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

// Set up Swagger
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// jwt
app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup' ,'/status']
    })
)

app.use('/users', userRouter);
app.use('/coaches', coachRouter)
app.use('/ploegen',ploegRouter )
app.use('/spelers', spelersRouter)
app.use('/zalen', zaalRouter)
app.use('/training-sessions', trainingSessionRouter)

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err); // Log the error for debugging 
  
    // Respond with a 400 status code and the error message
    res.status(400).json({
      status: 'application error',
      message: err.message,
    });
});



