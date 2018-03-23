/** @jsx helper */

function helper(type, props = {}, ...children){
    return { type, props, children }
}

const dom = (
  <div class="container">
    <h1>Hello world</h1>
    <p>Some text</p>
  </div>
)

console.dir(dom)
