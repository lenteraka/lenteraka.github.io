define(['dojo/_base/declare',
    "jimu/PanelManager",
    "dojo/dom-style",
  'jimu/BaseWidget'
],
function (declare, PanelManager, domStyle, BaseWidget) {
    var clazz = declare([BaseWidget], {

        name: "Map Info",
        baseClass: 'jimu-widget-mapInfo',

        onOpen: function () {
            pm = PanelManager.getInstance().getPanelById(this.id + '_panel');
            console.log(pm);
            pm.resize({ w: 500 });
        },

        _getMapExtent: function (map) {
            //Projection coordinate extent
            xmin = this.map.extent.xmin;
            ymin = this.map.extent.ymin;
            xmax = this.map.extent.xmax;
            ymax = this.map.extent.ymax;
            //Geographic coordinate extent
            geoxmin = this.map.geographicExtent.xmin;
            geoymin = this.map.geographicExtent.ymin;
            geoxmax = this.map.geographicExtent.xmax;
            geoymax = this.map.geographicExtent.ymax;
        
            document.getElementById("xmin").innerHTML = xmin;
            document.getElementById("ymin").innerHTML = ymin;
            document.getElementById("xmax").innerHTML = xmax;
            document.getElementById("ymax").innerHTML = ymax;
            document.getElementById("geoxmin").innerHTML = geoxmin;
            document.getElementById("geoymin").innerHTML = geoymin;
            document.getElementById("geoxmax").innerHTML = geoxmax;
            document.getElementById("geoymax").innerHTML = geoymax;
        },

        _getMapSpatialReference: function (map) {

            sr = this.map.extent.spatialReference.wkid

            document.getElementById("SR").value = sr;

        },

        getWebMapInfo: function (map) {

            var id = this.map.itemId
            var share = this.map.itemInfo.item.access
            var tags = []
            tags = this.map.itemInfo.item.tags
            var owner = this.map.itemInfo.item.owner
            var title = this.map.itemInfo.item.title

            document.getElementById("title").innerHTML = title;
            document.getElementById("owner").innerHTML = owner;
            document.getElementById("share").innerHTML = share;
            document.getElementById("id").innerHTML = id;
            document.getElementById("tags").innerHTML = tags.join(", ");

        },
        getLayerInfo: function (map) {

            var featureLayers = [];
            featureLayers = this.map.graphicsLayerIds
            var mapServiceLayers = [];
            mapServiceLayers = this.map.layerIds
            var layerIds = []
            var tableBody = document.createElement('TBODY')
            var table = document.createElement('TABLE')
            var myTableDiv = document.getElementById("layerTable")

            table.border = '1'
            table.appendChild(tableBody);

            layerIds = featureLayers.concat(mapServiceLayers);

            //TABLE ROWS
            for (i = 0; i < layerIds.length; i++) {
                var tr = document.createElement('TR');
                    var td = document.createElement('TD')
                    td.appendChild(document.createTextNode(layerIds[i]));
                    tr.appendChild(td)
                tableBody.appendChild(tr);
            }
            myTableDiv.appendChild(table)

            document.getElementById("lyrInfoBtn").disabled = 'true';
        }
  });
  return clazz;
});

function openTab(event, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

