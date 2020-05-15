import { Injectable } from '@angular/core'
@Injectable()
export class StorageService {

    key: string = 'LIBRARY_DATA';
    constructor() { }

    getData(key: string) {
        const libData = this.getLibData();
        if (libData) {
            return libData[key];
        }
        return null;
    }

    private getLibData() {
        return JSON.parse(window.localStorage.getItem(this.key));
    }

    private setLibData(libData: any) {
        return window.localStorage.setItem(this.key, JSON.stringify(libData));
    }

    saveData(key: string, value: any) {
        let libData = this.getLibData();
        if (!libData) {
            libData = {};
        }
        libData[key] = value;
        this.setLibData(libData);
    }

    removeData(key: string) {
        const libData = this.getLibData();
        if (libData) {
            delete libData[key];
            this.setLibData(libData);
        }
    }

    clearLibData() {
        window.localStorage.removeItem(this.key);
    }

}