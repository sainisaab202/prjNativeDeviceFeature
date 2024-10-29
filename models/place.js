export class Place{

    /**
     * 
     * @param {*} title 
     * @param {*} imageUri 
     * @param {*} address 
     * @param {is a lat, long value} location 
     */
    constructor(title, imageUri, location){
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = {lat: location.lat, lng: location.lng};
        this.id = new Date().toString() + Math.random().toString();
    }
}