/**
 * This file was created to eliminate the need for the jQuery library
 */

/**
* Turn dashed strings into cammel case strings.
*/
function toCamelCase(str){
	return str.replace(/-([a-z])/g, (_,c)=>c.toUpperCase());
}

/**
* @Class PseudoJQueryElement
* Motivation: This class was created to convert a jquery app to a vanillajs app without motifying the source.
*/
class PseudoJQueryElement {
	constructor(elements, promise = Promise.resolve()){
		this.elements = [...elements];
		this.promise = promise;
	}

	exec(action, ms, onFinish){
		const next = this.promise.then(
			() =>
				new Promise((resolve) =>
					setTimeout(() => {
						action();
						onFinish instanceof Function && onFinish();
						resolve();
					}, ms),
				),
		);
		return new PseudoJQueryElement(this.elements, next);
	}

	html(value, ms = 0, onFinish){
		const action = ()=> this.elements.forEach((el)=> el.innerHTML=value);
		return this.exec(action, ms, onFinish);
	}

	empty(ms = 0, onFinish){
		return this.html('', ms, onFinish);
	}

	append(value, ms = 0, onFinish){
		const action = ()=>{
			if (typeof value == "string") this.elements.forEach((el)=> el.innerHTML+=value);
			else if (value instanceof HTMLElement) this.elements.forEach((el)=> el.appendChild(value));
			else throw new Error("Value is not string or HTMLElement.")
		}
		return this.exec(action, ms, onFinish);
	}

	css(prop, value, ms = 0, onFinish){
		const action = ()=> this.elements.forEach((el)=> el.style[prop]=value);
		return this.exec(action, ms, onFinish);
	}

	attr(attribute, value, ms = 0, onFinish){
		const action = ()=> this.elements.forEach((el)=>{
			if (value) el.setAttribute(attribute, value)
			else el.removeAttribute(attribute);
		});
		return this.exec(action, ms, onFinish);
	}

	hide(ms = 0, onFinish){
		const action = () => this.elements.forEach((el) => el.classList.add("hidden"));
		return this.exec(action, ms, onFinish);
	}

	show(ms = 0, onFinish){
		const action = () =>
			this.elements.forEach((el) => el.classList.remove("hidden"));
		return this.exec(action, ms, onFinish);
	}

	click(value=0, onFinish){
				if (value instanceof Function) return this.exec(()=>this.elements.forEach((el)=> el.addEventListener('click', value),0, onFinish));
				else if (!isNaN(value)) return this.exec(()=>this.elements.forEach(el=>el.click()),value, onFinish);
				else throw new Error("The value provided is not a function.")
	}

	delay(ms = 100, onFinish){
		return this.exec(() => {}, ms, onFinish);
	}
}

class PseudoJQuery {
	static cash = {};

	static _getter(str){
		if (PseudoJQuery.cash[str] === undefined)
			PseudoJQuery.cash[str] = document.querySelectorAll(str);
		return PseudoJQuery.cash[str];
	}

	static _getTemplate(){
		if (PseudoJQuery.template === undefined)
			PseudoJQuery.template = document.createElement("template");
		return PseudoJQuery.template;
	}

	static init(){
		PseudoJQuery._addCSS();
		return (str) => new PseudoJQueryElement(PseudoJQuery._getter(str));
	}

	static _addCSS(){
		const style = document.createElement("style");
		style.innerHTML = PseudoJQuery._getCSSBody();
		document.head.appendChild(style);
	}

	static _getCSSBody(){
		return `
		.hidden{
				display: none !important;
		}
		`;
	}
}
