import PushNotification from 'react-native-push-notification';
import BackgroundJob from 'react-native-background-job';
import quotes from '../../data/english';
import hindiQuotes from '../../data/hindi';
import russianQuotes from '../../data/russian';
import marathiQuotes from '../../data/marathi';

const backgroundJob = {
  jobKey: 'myJob-en',
  job: () => {
    function getNextNotificationTime() {
      const nextNotifTime = new Date();
      nextNotifTime.setMinutes(nextNotifTime.getMinutes() + 1);
      nextNotifTime.setSeconds(0);
      return nextNotifTime;
    }
    const nextTime = getNextNotificationTime();
    const randomQuote = Math.floor((Math.random() * 1770));
    PushNotification.localNotificationSchedule({
      message: `${quotes.quotes[randomQuote].quote} \n-${quotes.quotes[randomQuote].author}`,
      date: nextTime,
      smallIcon: 'ic_notification',
      largeIcon: 'ic_launcher'
    });
  }
};

const backgroundJobMr = {
  jobKey: 'myJob-mr',
  job: () => {
    function getNextNotificationTime() {
      const nextNotifTime = new Date();
      nextNotifTime.setMinutes(nextNotifTime.getMinutes() + 1);
      nextNotifTime.setSeconds(0);
      return nextNotifTime;
    }
    const nextTime = getNextNotificationTime();
    const randomQuote = Math.floor((Math.random() * 14));
    PushNotification.localNotificationSchedule({
      message: `${marathiQuotes.quotes[randomQuote].quote} \n-${marathiQuotes.quotes[randomQuote].author}`,
      date: nextTime,
      smallIcon: 'ic_notification',
      largeIcon: 'ic_launcher'
    });
  }
};

const backgroundJobHi = {
  jobKey: 'myJob-hi',
  job: () => {
    function getNextNotificationTime() {
      const nextNotifTime = new Date();
      nextNotifTime.setMinutes(nextNotifTime.getMinutes() + 1);
      nextNotifTime.setSeconds(0);
      return nextNotifTime;
    }
    const nextTime = getNextNotificationTime();
    const randomQuote = Math.floor((Math.random() * 105));
    PushNotification.localNotificationSchedule({
      message: `${hindiQuotes.quotes[randomQuote].quote} \n-${hindiQuotes.quotes[randomQuote].author}`,
      date: nextTime,
      smallIcon: 'ic_notification',
      largeIcon: 'ic_launcher'
    });
  }
};

const backgroundJobRu = {
  jobKey: 'myJob-ru',
  job: () => {
    function getNextNotificationTime() {
      const nextNotifTime = new Date();
      nextNotifTime.setMinutes(nextNotifTime.getMinutes() + 1);
      nextNotifTime.setSeconds(0);
      return nextNotifTime;
    }
    const nextTime = getNextNotificationTime();
    const randomQuote = Math.floor((Math.random() * 30));
    PushNotification.localNotificationSchedule({
      message: `${russianQuotes.quotes[randomQuote].quote} \n-${russianQuotes.quotes[randomQuote].author}`,
      date: nextTime,
      smallIcon: 'ic_notification',
      largeIcon: 'ic_launcher'
    });
  }
};

const languageJobs = {
  en: backgroundJob,
  mr: backgroundJobMr,
  hi: backgroundJobHi,
  ru: backgroundJobRu
};

for (const key in languageJobs) {
  BackgroundJob.register(languageJobs[key]);
}

console.log('All Jobs Registered');
export default languageJobs;
