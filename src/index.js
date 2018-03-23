/** @jsx helper */

function helper(tag, props = {}, ...children){
    return { tag, props, children }
}

function createElement(virtualNode) {
    if (typeof virtualNode === 'string') return document.createTextNode(virtualNode)
    let domElement = document.createElement(virtualNode.tag)
    let props = virtualNode.props || {}
    Object.keys(props).forEach(prop => domElement.setAttribute(prop, props[prop]))
    virtualNode.children.forEach(child => {
        domElement.appendChild(createElement(child))
    })
    return domElement
}

function update(parent, oldNode, newNode, index = 0) {
    console.log(parent.childNodes, index)
    if (!oldNode) parent.appendChild(createElement(newNode))
    else if (!newNode) parent.removeChild(parent.childNodes[index])
    else if (typeof oldNode !== typeof newNode || typeof oldNode === 'string' && oldNode !== newNode || oldNode.tag !== newNode.tag) {
        parent.replaceChild(createElement(newNode), parent.childNodes[index])
    }
    else if (newNode.tag) {
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            update(
                parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
}

const dom = (
  <div className="container">
        <h1>Hello world</h1>
    <p class="sub-text">Some text</p>
        <ul class="list">
        <li>1. Item</li>
        <li>2. Item</li>
        <li>3. Item</li>
        <li>4. Item</li>
        </ul>
  </div>)

const domUpdate = (
        <div className="container">
        <h1>Hello world</h1>
        <p class="sub-text">Some text</p>
        <ul class="list">
        <li>1. Item</li>
        <li>4. Item</li>
        <li>3. Item</li>
        <li>4. Item</li>
        </ul>
  </div>)

const root = document.getElementById("root")
root.appendChild(createElement(dom))
document.getElementById("refresh").addEventListener('click', () => update(root, dom, domUpdate))
