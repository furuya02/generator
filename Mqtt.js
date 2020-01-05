
var awsIot = require('aws-iot-device-sdk');

class Mqtt {

    constructor(){
        this.topic = 'topic_1';
        this.device = awsIot.device({
            keyPath: './private.pem',
            certPath: './cert.pem',
            caPath: './root-CA.crt',
            clientId: 'iot-data-generator',
            host: 'xxxxxxxxxxxxxx-ats.iot.ap-northeast-1.amazonaws.com'
        });
    }

    async connect(){
        return new Promise( (resolve,reject) =>{
            this.device.on('connect', function() {
                console.log('connected');
                resolve();
            });
        });
    }

    dateStr(){
        const date = new Date();
        var str = date.getFullYear()
        + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
        + '/' + ('0' + date.getDate()).slice(-2)
        + ' ' + ('0' + date.getHours()).slice(-2)
        + ':' + ('0' + date.getMinutes()).slice(-2)
        + ':' + ('0' + date.getSeconds()).slice(-2)
        + '.' + ('0' + date.getMilliseconds()).slice(-3);
        return str;
    }

    publish(value){
        const json = {
            value: value,
            dt: this.dateStr()
        }
        console.log(JSON.stringify(json))
        this.device.publish(this.topic, JSON.stringify(json));
    }
}

module.exports = Mqtt;

