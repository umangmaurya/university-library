import { Injectable } from '@angular/core'
@Injectable()
export class StorageService {

    key: string = 'LIBRARY_DATA';
    constructor() { }

    /* To get data from local storage */
    getData(key: string) {
        const libData = this.getLibData();
        if (libData) {
            return libData[key];
        }
        return null;
    }

    /**
     * To fetch data from local storage for this application : LIBRARY_DATA
     */
    private getLibData() {
        return JSON.parse(window.localStorage.getItem(this.key));
    }


    /**
     * @param  {any} libData
     * To save data to local storage for this application : LIBRARY_DATA
     */
    private setLibData(libData: any) {
        return window.localStorage.setItem(this.key, JSON.stringify(libData));
    }

    /* To save data in local storage */
    saveData(key: string, value: any) {
        let libData = this.getLibData();
        if (!libData) {
            libData = {};
        }
        libData[key] = value;
        this.setLibData(libData);
    }

    /* To delete data in local storage */
    removeData(key: string) {
        const libData = this.getLibData();
        if (libData) {
            delete libData[key];
            this.setLibData(libData);
        }
    }

    /* To clear entire data LIBRARY_DATA */
    clearLibData() {
        window.localStorage.removeItem(this.key);
    }

}