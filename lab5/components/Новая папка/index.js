import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
export class ProductFilter {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
            <button class="btn btn-primary" style="width:100px;"id="click-card-" data-id="1">${data}</button>
            `
        )
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-`)
            .addEventListener("click", listener)
    }
    
    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}