import express from 'express';
import cors from 'cors';
import schedule from 'node-schedule';
import mongoConnect from './config/db.connect';
import authRoutes from './routes/auth.routes';
import babyRoutes from './routes/babies.routes';
import nutriRoutes from './routes/nutri.routes';
import adminRoutes from './routes/admin.routes';
import nutritionPlanModel from './models/nutriplan.model';
import axios from 'axios';
import moment from 'moment';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', babyRoutes);
app.use('/api', nutriRoutes);
app.use('/api', adminRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to MiBabi API",
    })
});

app.use((req, res) => {
    res.type('json').status(404).json({
        message: '404 Endpoint not found',
        status: 404
    });
});

const sendPushNotification = async (expoPushToken, action) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Baby Life',
      body: 'Hi, This is a reminder for ' + action + ', You should start to go to nutrition plan screen for mote information',
    };
  
    await axios.post('https://exp.host/--/api/v2/push/send', message, {
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
    }).then(async() => {
        console.log('done');
    }).catch(err => {
        console.log(err.response);
    });
  }

schedule.scheduleJob('* * * * * *', async () => {
    // Find notifications in the database that are due for sending
    const currentTime = new Date();
    const notification = await nutritionPlanModel.find();
    notification.forEach((item) => {
        const equal = moment(currentTime).format('LT');
        if(equal === item.hour) {
            sendPushNotification(item.expoPushToken);
        }
    })
});
  

app.listen("5049", () => console.log(`Server is running on port 5049.`));
mongoConnect();
