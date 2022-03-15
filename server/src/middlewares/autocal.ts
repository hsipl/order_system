import { CronJob } from 'cron';
class AutoCal {

    cronJob: CronJob;
  
    constructor() {
        // 秒 分 時
      this.cronJob = new CronJob('0 0 04 * * *', async () => {
        try {
          await this.bar();
        } catch (e) {
          console.error(e);
        }
      });
      
      // Start job
      if (!this.cronJob.running) {
        this.cronJob.start();
      }
    }
  
    async bar(): Promise<void> {
      // Do some task
      await console.log('test');
    
    }
  }
  
  export default new AutoCal();