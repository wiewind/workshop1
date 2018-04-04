<script type="text/javascript" src="/apps/lib/pdfobject/pdfobject.min.js"></script>
<script type="text/javascript" src='/apps/lib/pdfjs/pdf.js'></script>
<div id="pdf-canvas" style="width: 100%; height: 100%;"></div>
<script type="text/javascript">
    if(PDFObject.supportsPDFs){
        PDFObject.embed("<?= $frameurl ?>", "#pdf-canvas");
    } else {
        PDFJS.getDocument('<?= $frameurl ?>').then(function(pdf) {
            var numPages = pdf.numPages;
            var start = 1;
            renderPageAsync(pdf, numPages, start);
        });

        function renderPage(pdf, numPages, current){
            pdf.getPage(current++).then(function(page) {
                //console.log('page', page);
                //page.getTextContent().then(v=>console.log(v));
                var scale = 1;
                var viewport = page.getViewport(scale);
                // Prepare canvas using PDF page dimensions.
                var canvas = document.createElement("canvas");
                var context = canvas.getContext('2d');
//                document.body.appendChild(canvas);
                document.getElementById('pdf-canvas').style.overflow = 'scroll';
                document.getElementById('pdf-canvas').appendChild(canvas);


                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context.
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);

                //next
                if(current<=numPages)return renderPage(pdf, numPages, current);
            });
        }

        async function renderPageAsync(pdf, numPages, current){
            for(var i=1; i<=numPages; i++){
                // page
                var page = await pdf.getPage(i);

                var scale = 1;
                var viewport = page.getViewport(scale);
                // Prepare canvas using PDF page dimensions.
                var canvas = document.createElement("canvas");
                var context = canvas.getContext('2d');
                document.getElementById('pdf-canvas').appendChild(canvas);
                document.getElementById('pdf-canvas').style.overflow = 'scroll';

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context.
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            }
        }
    }
</script>