import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductFilter} from "../../components/filter/index.js";
import {ButtonComponent} from "../../components/button/index.js";
import {RightButtonComponent} from "../../components/right-button/index.js";
import {ProductPage} from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";
let pos = 0
let fil=['friends','unsure','managers','donut']
export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    getData() {
        ajax.post(urls.getGroupMembersFilter(groupId,fil[pos%4]), (data) => {
            
            this.renderData(data.response.items)
        })
    }
    
    getData1() {
        // return {
        //     id: 1,
        //     src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
        //     title: "Акция",
        //     text: "У меня есть крутая акция"
        // }
        ajax.post(urls.getGroupMembersFilter(groupId,'friends'), (data) => {
            
            this.renderData(data.response.items)
        })
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }
    clickCard(e) {
        const cardId = e.target.dataset.id
        
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
    
    clickCardFilter(e) {
        pos++
        //alert(pos)
        
        this.render()
    }

    renderData(items) {
        
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
    renderDataFilter() {
        this.render()
        //const data = ch
        //const productFilter = new ProductFilter(this.pageRoot)
        //productFilter.render(data, this.clickCardFilter.bind(this))
    }
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const productFilter = new ProductFilter(this.pageRoot)
        productFilter.render(fil[pos%4], this.clickCardFilter.bind(this))
        this.getData()
        
    }
    
}
