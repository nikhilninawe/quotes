import PushNotification from 'react-native-push-notification';
import BackgroundJob from 'react-native-background-job';
import quotes from '../../data/english';
import hindiQuotes from '../../data/hindi';
import russianQuotes from '../../data/russian';
import marathiQuotes from '../../data/marathi';

function getRandomQuote(inputQuotes, limit) {
  while (true) {
    const randomQuote = Math.floor((Math.random() * limit));
    if (inputQuotes[randomQuote].quote) {
      return inputQuotes[randomQuote];
    }
  }
}

function getNextNotificationTime() {
  const nextNotifTime = new Date();
  nextNotifTime.setMinutes(nextNotifTime.getMinutes() + 1);
  nextNotifTime.setSeconds(0);
  return nextNotifTime;
}

function scheduleNotification(message, date) {
  PushNotification.localNotificationSchedule({
    message,
    date,
    smallIcon: 'ic_notification',
    largeIcon: 'ic_launcher'
  });
}

const backgroundJob = {
  jobKey: 'myJob-en',
  job: () => {
    const nextTime = getNextNotificationTime();
    const quote = getRandomQuote(quotes.quotes, 1770);
    scheduleNotification(`${quote.quote} \n-${quote.author}`, nextTime);
  }
};

const backgroundJobMr = {
  jobKey: 'myJob-mr',
  job: () => {
    const nextTime = getNextNotificationTime();
    const quote = getRandomQuote(marathiQuotes.quotes, 14);
    scheduleNotification(`${quote.quote} \n-${quote.author}`, nextTime);
  }
};

const backgroundJobHi = {
  jobKey: 'myJob-hi',
  job: () => {
    const nextTime = getNextNotificationTime();
    const quote = getRandomQuote(hindiQuotes.quotes, 105);
    scheduleNotification(`${quote.quote} \n-${quote.author}`, nextTime);
  }
};

const backgroundJobRu = {
  jobKey: 'myJob-ru',
  job: () => {
    const nextTime = getNextNotificationTime();
    const quote = getRandomQuote(russianQuotes.quotes, 30);
    scheduleNotification(`${quote.quote} \n-${quote.author}`, nextTime);
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
