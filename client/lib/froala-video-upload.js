// get AWS policy and signature from the server @AB
var aws = Meteor.call('froalaUpload', function(error, result){
  // console.log(result);
  // TODO: refactor to reactive VAR
  Session.set('awsBase', result); // assign results to the session, reactive var wasn't reliable
});

/*!
 * froala_editor v1.2.8 (https://www.froala.com/wysiwyg-editor)
 * License https://www.froala.com/wysiwyg-editor/terms
 * Copyright 2014-2015 Froala Labs
 */
!function(a){a.Editable.commands=a.extend(a.Editable.commands,{
uploadVideo:{
  title:"Insert video",
  icon:"fa fa-video-camera",
  callback:function(){
    this.insertFile()
  },undo:!1}}
),

a.Editable.DEFAULTS=a.extend(a.Editable.DEFAULTS,{
  allowedFileTypes:["*"],
  fileDeleteUrl:null,
  fileDeleteParams:{},
  fileUploadParams:{},
  // fileUploadURL:"https://gatekeymusic.s3.amazonaws.com",
  fileUploadURL:"",
  fileUploadParam: "file",
  maxFileSize:209715200, // 200 mb
  useFileName:!0,
  headers: {

  }
}),

a.Editable.prototype.showFileWrapper=function(){
  this.$file_wrapper&&this.$file_wrapper.show()
},

a.Editable.prototype.hideFileWrapper=function(){
  this.$file_wrapper && (this.$file_wrapper.hide(),this.$file_wrapper.find("input").blur())
},

a.Editable.prototype.showFileUpload=function(){
  this.hidePopups(),
  this.showFileWrapper()
},

a.Editable.prototype.insertFile=function(){
  this.closeImageMode(),
  this.imageMode=!1,
  this.showFileUpload(),
  this.saveSelectionByMarkers(),
  this.options.inlineMode||this.positionPopup("uploadVideo")
},

a.Editable.prototype.fileUploadHTML=function(){
  var b='<div class="froala-popup froala-file-popup" style="display: none;">'
  +'<h4><span data-text="true">Upload video</span>'
  +'<i title="Cancel" class="fa fa-times" id="f-file-close-'+this._id+'"></i></h4>';

  return b+='<div id="f-file-list-'+this._id+'">',
  b+='<div class="f-popup-line drop-upload">',
  b+='<div class="f-upload" id="f-file-upload-div-'+this._id+'"><strong data-text="true">Drop Video</strong><br>(<span data-text="true">or click</span>)'
  +'<form target="file-frame-'+this._id+'" enctype="multipart/form-data" encoding="multipart/form-data" action="https://gatekeymusic.s3.amazonaws.com" method="post" id="f-file-form-'+this._id+'">'
  + '<input type="hidden" name="key" value="data/">'
  + '<input type="hidden" name="AWSAccessKeyId" value="AKIAJI7JFFBN3FHM6LOQ">'
  + '<input type="hidden" name="acl" value="private">'
  + '<input type="hidden" name="success_action_redirect" value="http://localhost/">'
  +'<input id="f-video-upload-'+this._id+'" type="file" name="'+this.options.fileUploadParam+'" accept="video/*"></form></div>',
  this.browser.msie&&a.Editable.getIEversion()<=9&&(b+='<iframe id="file-frame-'+this._id+'" name="file-frame-'+this._id+'" src="javascript:false;" style="width:0; height:0; border:0px solid #FFF; position: fixed; z-index: -1;" data-loaded="true"></iframe>'),
  b+="</div>",
  b+="</div>",
  b+='<p class="f-progress" id="f-file-progress-'+this._id+'"><span></span></p>',
  b+="</div>"
  },

  a.Editable.prototype.buildFileDrag=function(){
    var b=this;
    b.$file_wrapper.on("dragover","#f-file-upload-div-"+this._id,function(){
      return a(this).addClass("f-hover"),!1
    }),
    b.$file_wrapper.on("dragend","#f-file-upload-div-"+this._id,function(){
      return a(this).removeClass("f-hover"),!1
    }),
    b.$file_wrapper.on("drop","#f-file-upload-div-"+this._id,function(c){
      c.preventDefault(),
      c.stopPropagation(),
      a(this).removeClass("f-hover"),
      b.uploadVideo(c.originalEvent.dataTransfer.files)
    }),
    b.$element.on("drop",function(c){
      var d=c.originalEvent.dataTransfer.files;
      if(0===a(".froala-element img.fr-image-move").length&&c.originalEvent.dataTransfer&&d&&d.length){
        if(b.isDisabled)return!1;
        b.options.allowedImageTypes.indexOf(d[0].type.replace(/image\//g,""))<0&&(b.closeImageMode(),b.hide(),b.imageMode=!1,b.initialized||(b.$element.unbind("mousedown.element"),
          b.lateInit()),
        b.insertMarkersAtPoint(c.originalEvent),
        b.showByCoordinates(c.originalEvent.pageX,c.originalEvent.pageY),
        b.uploadVideo(d),
        c.preventDefault(),
        c.stopPropagation())
      }
    })
  },


    a.Editable.prototype.buildFileUpload = function(){
      this.$file_wrapper=a(this.fileUploadHTML()),
      this.$popup_editor.append(this.$file_wrapper),
      this.buildFileDrag();
      var b=this;
      if(this.$file_wrapper.on("mouseup touchend",a.proxy(function(a){
        this.isResizing()||a.stopPropagation()},this)
      ),
      this.addListener("hidePopups",a.proxy(function(){
        this.hideFileWrapper()},this)
      ),
      this.$file_progress_bar=this.$file_wrapper.find("p#f-file-progress-"+this._id),
      this.browser.msie&&a.Editable.getIEversion()<=9){
        var c=this.$file_wrapper.find("iframe").get(0);
        c.attachEvent?c.attachEvent("onload",function(){b.iFrameLoad()}):c.onload=function(){b.iFrameLoad()}}

      this.$file_wrapper.on("change",'input[type="file"]',function(){
        if(void 0!==this.files) {
          b.uploadVideo(this.files)
        } else {
          var c=a(this).parents("form");
          c.find('input[type="hidden"]').remove();
          var d;
          for(d in b.options.fileUploadParams)c.prepend('<input type="hidden" name="'+d+'" value="'+b.options.fileUploadParams[d]+'" />');
            b.$file_wrapper.find("#f-file-list-"+b._id).hide(),
            b.$file_progress_bar.show(),
            b.$file_progress_bar.find("span").css("width","100%").text("Please wait!"),
            b.showFileUpload(),c.submit()
        }
        a(this).val("")
      }),

      this.$file_wrapper.on(this.mouseup,"#f-file-close-"+this._id,a.proxy(function(a){
          a.stopPropagation(),
          a.preventDefault(),
          this.$bttn_wrapper.show(),
          this.hideFileWrapper(),
          this.restoreSelection(),
          this.focus(),
          this.hide()
        },this)
      ),this.$file_wrapper.on("click",function(a){a.stopPropagation()}),

      this.$file_wrapper.on("click","*",function(a){
        a.stopPropagation()
      })},

    a.Editable.initializers.push(a.Editable.prototype.buildFileUpload),


    a.Editable.prototype.uploadVideo= function(b){
      console.log('uploadVideo');
      console.log(this);
      var file = b[0];

      var payloadData = function() {
        var fd = new FormData();
        var key = "data/" + (new Date).getTime()+ '-' + file.name;
        console.log(c);
        fd.append('acl', 'public-read');
        fd.append('AWSAccessKeyId', 'AKIAJI7JFFBN3FHM6LOQ');
        fd.append('policy', Session.get('awsBase').s3Policy);
        fd.append('signature',Session.get('awsBase').s3Signature);
        fd.append('success_action_status', '201');
        fd.append('X-Requested-With', 'xhr');
        fd.append('Content-Type', file.type);
        fd.append('key', key);
        fd.append("file", file);
        fd.timeout = 600000;
        return fd;
      }

      var createCORSRequestt = function createCORSRequestt(a,b){
        var c = new XMLHttpRequest;
        //console.log(file);



        c.open('POST','https://gatekeymusic.s3.amazonaws.com',true);


        //c.send(fd);
        // if("withCredentials"in c){
        //   c.open(a,b,!0),
        //   // this.options.withCredentials && (c.withCredentials = !0);
        //   // for(var d in this.options.headers) {
        //   //   c.setRequestHeader(d,this.options.headers[d])
        //   // }
        //   c.send(fd);
        // } else {
        //   "undefined"!=typeof XDomainRequest?(c=new XDomainRequest,c.open(a,b)):c=null;
        // }
        return c;
      }



      if(!this.triggerEvent("beforeFileUpload",[b],!1))return!1;
      if(void 0!==b&&b.length>0){
        var c;
        if(this.drag_support.formdata && (c=this.drag_support.formdata?new FormData:null),c){
          var d;
          for(d in this.options.fileUploadParams)c.append(d,this.options.fileUploadParams[d]);
            if(c.append(this.options.fileUploadParam,b[0]),b[0].size>this.options.maxFileSize)return this.throwFileError(5),!1;
          if(this.options.allowedFileTypes.indexOf(b[0].type)<0&&this.options.allowedFileTypes.indexOf("*")<0)return this.throwFileError(6),!1
        }

        if(c){
          var e;
          //console.log(this.createCORSRequest);
          // if(this.options.crossDomain)e=this.createCORSRequest("POST",this.options.fileUploadURL);
          // else{e=new XMLHttpRequest,e.open("POST",this.options.fileUploadURL);

          //   for(var f in this.options.headers) {
          //     e.setRequestHeader(f,this.options.headers[f])
          //   }
          // }


        e = createCORSRequestt("POST",this.options.fileUploadURL);
        console.log(e);
        var g = b[0].name; // file name

        e.onload = a.proxy(function(){
          this.$file_progress_bar.find("span").css("width","100%").text("Please wait!");
          try {
            e.status>=200 && e.status<300 ? this.parseFileResponse(e.responseText,g):this.throwFileError(3)
          } catch(a){this.throwFileError(4)}
        },this),

        e.onerror=a.proxy(function(){
          this.throwFileError(3)
        },this),

        e.upload.onprogress=a.proxy(function(a){
          if(a.lengthComputable){
            var b = a.loaded/a.total*100|0;this.$file_progress_bar.find("span").css("width",b+"%")
          }
        },this),

        e.onload = a.proxy(function(a) {
          var response = a.target.responseText;
          var url = $(response).find('Location').text();
          this.$file_progress_bar.hide();
          this.restoreSelectionByMarkers()
          this.focus()
          this.insertHTML('<p> </p><video display: block; margin-top: 10px;" src="'+url+'" controls>your browser doesnt support html5 video</video>')
          this.hide()
          this.hideFileLoader()
          this.$file_progress_bar.hide();
          this.triggerEvent("fileUploaded",[])

          Videos.insert({
            url: url
          });


          this.focus()
          console.log($(response));
        }, this),

        e.send(payloadData()),

        this.$file_wrapper.find("#f-file-list-"+this._id).hide(),
        this.$file_progress_bar.show(),
        this.showFileUpload()
        }
        }
      },


    a.Editable.prototype.throwFileError=function(a){
      var b="Unknown file upload error.";
      1==a?b="Bad link.":2==a?b="No link in upload response.":3==a?b="Error during file upload.":4==a?b="Parsing response failed.":5==a?b="File too large.":6==a?b="Invalid file type.":7==a&&(b="File can be uploaded only to same domain in IE 8 and IE 9."),
      this.triggerEvent("fileError",[{code:a,message:b}],!1),
      this.hideFileLoader()},

    a.Editable.prototype.hideFileLoader=function(){
      this.$file_progress_bar.hide(),
      this.$file_progress_bar.find("span").css("width","0%").text(""),
      this.$file_wrapper.find("#f-file-list-"+this._id).show()
    },

    a.Editable.prototype.throwFileErrorWithMessage=function(a){
      this.triggerEvent("fileError",[{
        message:a,code:0
      }],!1),
      this.hideFileLoader()
    },

    a.Editable.prototype.parseFileResponse=function(b,c){
      try{
        if(!this.triggerEvent("afterFileUpload",[b],!1))return!1;
        var d=a.parseJSON(b);
        d.link?this.writeFile(d.link,c,b):d.error?this.throwFileErrorWithMessage(d.error):this.throwFileError(2)
      } catch(e) {
        this.throwFileError(4)}
    },

    a.Editable.prototype.writeFile=function(a,b,c){
      this.restoreSelectionByMarkers(),
      this.focus(),
      this.options.useFileName||""=== this.text()||(b=this.text()),
      this.insertHTML('<a class="fr-file" href="'+this.sanitizeURL(a)+'">'+b+"</a>"),
      this.hide(),
      this.hideFileLoader(),
      this.focus(),
      this.triggerEvent("fileUploaded",[b,a,c])
    }

  }(jQuery);
