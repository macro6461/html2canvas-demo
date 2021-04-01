import html2canvas from 'html2canvas'

const HtmlCanvasDemo = () =>{

    const exportAsPicture = () => {
        var html = document.getElementsByTagName('HTML')[0]
        var body =  document.getElementsByTagName('BODY')[0]
        var htmlWidth = html.clientWidth;
        var bodyWidth = body.clientWidth;
        
        var data = document.getElementById('exportContainer')
        var newWidth = data.scrollWidth - data.clientWidth

        
        if (newWidth > data.clientWidth){
            htmlWidth += newWidth 
            bodyWidth += newWidth
        }
        
        html.style.width = htmlWidth + 'px'
        body.style.width = bodyWidth + 'px'

        
        html2canvas(data).then((canvas)=>{
            var image = canvas.toDataURL('image/png', 1.0);
            return image
        }).then((image)=>{
            saveAs(image, 'exported-vis.png') 
            html.style.width = null
            body.style.width = null
        })
    }

    const saveAs = (blob, fileName) =>{
        var elem = window.document.createElement('a');
        elem.href = blob
        elem.download = fileName;
        elem.style = 'display:none;';
        (document.body || document.documentElement).appendChild(elem);
        if (typeof elem.click === 'function') {
            elem.click();
        } else {
            elem.target = '_blank';
            elem.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
            }));
        }
        URL.revokeObjectURL(elem.href);
        elem.remove()
    }

    return (
    <>
    <div className="parent">
        <div id="exportContainer">
            <h1>HERE IS A REALLY LONG TITLE TO DEMONSTRATE HOW TO COMPENSATE FOR OVERFLOW ITS STILL GOING OMG WHEN DOES IT END OK NOW.</h1>
        </div>
    </div>
    <button onClick={exportAsPicture}>screenshot</button>
    </>)
};

export default HtmlCanvasDemo;