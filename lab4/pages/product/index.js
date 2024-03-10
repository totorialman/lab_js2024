import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
export class ProductPage {
    constructor(parent, id, src) {
        this.parent = parent
        this.id = id
        //alert(src)
        this.src = src
    }

    getData() {
        ajax.post(urls.getUserInfo(this.id), (data) => {
            
            this.renderData(data.response)
        })
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot)
        try{
            if(item[0].city.title){}
        }
        catch{
            item[0].city={"id":155,
            "title":"Город скрыт"}
        }
        if(item[0].online==0) {
            item[0].online={"id":'Не в сети',"title":"red"}
            
            
        }
        else if(item[0].online==1) {item[0].online={"id":'В сети',"title":"green"}}
        product.render(item[0])
    }
    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
        
        this.getData()
    }
}