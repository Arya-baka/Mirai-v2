const fetch = require("node-fetch")

class getIPInfo {
    GetAll(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out);
                    })
                })
    }

    GetAS(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["as"]);
                    })
                })
    }

    GetCity(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["city"]);
                    })
                })
    }

    GetCountry(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["country"]);
                    })
                })
    }

    GetCountryCode(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["countryCode"]);
                    })
                })
    }

    GetISP(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["isp"]);
                    })
                })
    }

    GetOrg(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["org"]);
                    })
                })
    }

    GetRegion(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["region"]);
                    })
                })
    }

    GetRegionName(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["regionName"]);
                    })
                })
    }

    GetQueryStatus(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["status"]);
                    })
                })
    }

    GetTimezone(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["timezone"]);
                    })
                })
    }

    GetZip(servercode){
        return new Promise((send, err) => {

        fetch("http://ip-api.com/json/"+servercode)
                    .then(res => res.json())
                    .then((out) => {
                        send(out["zip"]);
                    })
                })
    }
    
}

module.exports.getIPInfo = getIPInfo;