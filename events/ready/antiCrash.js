module.exports = () => {

    process.on('unhandledRejection', (reason, promise) => {

      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      
    });

};