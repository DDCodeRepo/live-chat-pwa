export const Logger = {
  enable: false,
  enableBugfender: true,
  log: (title: any, data?: any, force?: boolean) => {
    try {
      if (Logger.enable || force) {
        if (data) console.log(title, data);
        else console.log(title);
      }
    } catch (error) {
      Logger.log("Error in logger log()", error.message);
    }
  },
  error: (title: any, err?: any, force?: boolean) => {
    try {
      if (Logger.enable || force) {
        if (err) console.error(title, err);
        else console.error(title);
      }
    } catch (error) {
      Logger.log("Error in logger error()", error.message);
    }
  },
};
