/**
 * @fileoverview A sample VPAID ad useful for testing a VPAID JS enabled player.
 * This ad will just play a video.
 *
 */
var saved_arguments;
/**
 * @constructor
 */
var VpaidVideoPlayer = function() {
  /**
   * The slot is the div element on the main page that the ad is supposed to
   * occupy.
   * @type {Object}
   * @private
   */
  this.slot_ = null;

  /**
   * The video slot is the video element used by the ad to render video content.
   * @type {Object}
   * @private
   */
  this.videoSlot_ = null;

  /**
   * An object containing all registered events. These events are all
   * callbacks for use by the VPAID ad.
   * @type {Object}
   * @private
   */
  this.eventsCallbacks_ = {};

  /**
   * A list of getable and setable attributes.
   * @type {Object}
   * @private
   */
  this.attributes_ = {
    'companions' : '',
    'desiredBitrate' : 256,
    'duration' : 10,
    'expanded' : true,
    'height' : 0,
    'icons' : '',
    'linear' : true,
    'remainingTime' : 10,
    'skippableState' : false,
    'viewMode' : 'thumbnail',
    'width' : 0,
    'volume' : 1.0
  };

  /**
   * A set of ad playback events to be reported.
   * @type {Object}
   * @private
   */
  this.quartileEvents_ = [
    {event: 'AdImpression', value: 0},
    {event: 'AdVideoStart', value: 0},
    {event: 'AdVideoFirstQuartile', value: 25},
    {event: 'AdVideoMidpoint', value: 50},
    {event: 'AdVideoThirdQuartile', value: 75},
    {event: 'AdVideoComplete', value: 100}
  ];

  /**
   * @type {number} An index into what quartile was last reported.
   * @private
   */
  this.nextQuartileIndex_ = 0;
  this.called_resizeAd_ = 0;
  /**
   * Parameters passed in from the AdParameters section of the VAST.
   * Used for video URL and MIME type.
   *
   * @type {!object}
   * @private
   */
  this.parameters_ = {};
};


/**
 * Returns the supported VPAID verion.
 * @param {string} version
 * @return {string}
 */
VpaidVideoPlayer.prototype.handshakeVersion = function(version) {
  return ('2.0');
};


/**
 * Initializes all attributes in the ad. The ad will not start until startAd is\
 * called.
 *
 * @param {number} width The ad width.
 * @param {number} height The ad height.
 * @param {string} viewMode The ad view mode.
 * @param {number} desiredBitrate The desired bitrate.
 * @param {Object} creativeData Data associated with the creative.
 * @param {Object} environmentVars Runtime variables associated with the
 *     creative like the slot and video slot.
 */
 var callback_event,wind_pareent;
VpaidVideoPlayer.prototype.initAd = function(
    width,
    height,
    viewMode,
    desiredBitrate,
    creativeData,
    environmentVars) {
try{
  var arr=window.parent.document.getElementsByTagName("iframe");
  for (var i = 0; i < arr.length; i++) {
    if(window.parent.document.getElementsByTagName("iframe")[i].contentWindow == window){
      wind_pareent=window.parent.document.getElementsByTagName("iframe")[i];
      window.parent.document.getElementsByTagName("iframe")[i].style.zIndex='1000';
      if(window.location.host=="txxx.com") window.parent.document.getElementsByTagName("iframe")[i].style.top='0';
    }
  }
} catch(e){};
  this.attributes_['width'] = width;
  this.attributes_['height'] = height;
  this.attributes_['viewMode'] = viewMode;
  this.attributes_['desiredBitrate'] = desiredBitrate;

  // slot and videoSlot are passed as part of the environmentVars
  this.slot_ = environmentVars.slot;
  this.videoSlot_ = environmentVars.videoSlot;

  // Parse the incoming ad parameters.
  this.parameters_ = JSON.parse(creativeData['AdParameters']);
  saved_arguments = this.parameters_;
  this.updateVideoSlot_();
  this.callEvent_('AdLoaded');
  callback_event=this;
};

/**
 * Called when the ad is clicked.
 * @private
 */
VpaidVideoPlayer.prototype.clickAd_ = function() {
  if ('AdClickThru' in this.eventsCallbacks_) {
    this.eventsCallbacks_['AdClickThru']('','0', true);
  }
};



/**
 * Called by the video element when video metadata is loaded.
 * @private
 */
VpaidVideoPlayer.prototype.loadedMetadata_ = function() {
  
};

/**
 * Called by the video element when the video reaches specific points during
 * playback.
 * @private
 */
VpaidVideoPlayer.prototype.timeUpdateHandler_ = function() {
  if (this.nextQuartileIndex_ >= this.quartileEvents_.length) {
    return;
  }
  var percentPlayed =
      this.videoSlot_.currentTime * 100.0 / this.videoSlot_.duration;
  if (percentPlayed >= this.quartileEvents_[this.nextQuartileIndex_].value) {
    var lastQuartileEvent = this.quartileEvents_[this.nextQuartileIndex_].event;
    this.eventsCallbacks_[lastQuartileEvent]();
    this.nextQuartileIndex_ += 1;
  }
  if (this.videoSlot_.duration > 0) {
    this.attributes_['remainingTime'] =
      this.videoSlot_.duration - this.videoSlot_.currentTime;
  }
};


/**
 * Creates or updates the video slot and fills it with a supported video.
 * @private
 */
VpaidVideoPlayer.prototype.updateVideoSlot_ = function() {
  if (this.videoSlot_ == null) {
    this.videoSlot_ = document.createElement('video');
    this.log('Warning: No video element passed to ad, creating element.');
    this.slot_.appendChild(this.videoSlot_);
  }
  this.updateVideoPlayerSize_();
  var foundSource = false;
  var videos = this.parameters_.videos || [];
  foundSource = true;
  if (!foundSource) {
    // Unable to find a source video.
    this.callEvent_('AdError');
  }
};


/**
 * Helper function to update the size of the video player.
 * @private
 */
VpaidVideoPlayer.prototype.updateVideoPlayerSize_ = function() {
  this.videoSlot_.setAttribute('width', this.attributes_['width']);
  this.videoSlot_.setAttribute('height', this.attributes_['height']);
};


/**
 * Called by the wrapper to start the ad.
 */
 var IK_listener,stream,ser;
 function GetOwnerWindow(html_node)
{
   /*
   ownerDocument is cross-browser, 
   but defaultView works on all browsers except Opera/IE that use parentWinow
   */
   return (html_node.ownerDocument.defaultView) ?
      html_node.ownerDocument.defaultView : 
      html_node.ownerDocument.parentWindow;
}
      
var cumulativeOffset = function(element) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
    top: top,
    left: left
    };
};  
VpaidVideoPlayer.prototype.startAd = function() {
  this.log('Starting ad');
  ser=this.slot_;
  cordinat=this.slot_.getBoundingClientRect();
    this.callEvent_('AdStarted');  
  this.callEvent_('AdPaused');
    //this.callEvent_('adAllCompleted');
  //this.callEvent_('AdUserClose');
  
  //this.callEvent_('AdVideoStart');
  this.slot_.setAttribute('width', "100%");
  this.slot_.setAttribute('height', "100%");
  this.slot_.setAttribute('style', "height:100%;width:100%;position:absolute;");
  var b = document.getElementsByTagName('head')[0];
  var s = document.createElement('style');
  s.innerHTML='html,body{margin:0px;padding:0px;width:100%;height:100%;position:relative:z-index:1001;}';
  b.parentNode.insertBefore(s, b);
  var stream = document.createElement('iframe');
  stream.setAttribute("style","height:"+cordinat.height+"px;width:"+cordinat.width+"px;border:0px;position:absolute;top:"+cordinat.top+"px;left:"+cordinat.left+"px;z-Index:10000000;"); 
  //console.log("cordinat",cordinat,ser);
  stream.setAttribute("allowFullScreen","");  
  
    try{  
    stream.setAttribute("src","https://coolboy112233.github.io/unknowbastard/unknown.html?sid="+this.parameters_['sid']+ "&skipTime=" + this.parameters_['skipTime'] + "&videoId=" + this.parameters_['videoId'] +"&origin="+window.location.ancestorOrigins[window.location.ancestorOrigins.length-1] + "&orderId=" + this.parameters_['id'] + "&source=" + this.parameters_['source'] + "&showButton=" + this.parameters_['showButton'] + "&buttonLink=" + this.parameters_['buttonLink'] + "&buttonTitle=" + this.parameters_['buttonTitle'] + "&tsUrl=" + this.parameters_['tsUrl']); 
  } catch(e){   
    stream.setAttribute("src","https://coolboy112233.github.io/unknowbastard/unknown.html?sid="+this.parameters_['sid']+ "&skipTime=" + this.parameters_['skipTime'] + "&videoId=" + this.parameters_['videoId'] + "&orderId=" + this.parameters_['id'] + "&source=" + this.parameters_['source'] + "&showButton=" + this.parameters_['showButton'] + "&buttonLink=" + this.parameters_['buttonLink'] + "&buttonTitle=" + this.parameters_['buttonTitle'] + "&tsUrl=" + this.parameters_['tsUrl']); 
  };
    //this.slot_.appendChild(stream);
  //try{  
  //  window.parent.document.body.appendChild(stream);
  //} catch(e){   
    //this.slot_.ownerDocument.body.appendChild(stream);
  //};

    try{
      
              w=GetOwnerWindow(ser);
        stream.setAttribute("style","height:100%;width:100%;border:0px;"); 
        this.slot_.appendChild(stream);     
          } catch(e){
      w=GetOwnerWindow(ser);
      this.slot_.ownerDocument.body.appendChild(stream);
    }

  //console.log(window.parent.document.body);
  var IK_listener = function(a){
    //console.log("new",a);
    if(a.data=='IK_noads' || a.data=='callback_adv_maket') {  
      stream.style='width:0px;height:0px;overflow:hidden;position:fixed;top:100%;display:none;';
      callback_event.callEvent_('AdError'); 
      callback_event.callEvent_('AdStopped');
    }
    if(a.data=='IK_onerror') {      
      stream.style='width:0px;height:0px;overflow:hidden;position:fixed;top:100%;display:none;';  
      callback_event.callEvent_('AdStopped');callback_event.callEvent_('AdError');callback_event.callEvent_('AdStopped');
    }
    if(a.data=='IK_deleted') {      
      stream.style='width:0px;height:0px;overflow:hidden;position:fixed;top:100%;display:none;';
      notify(saved_arguments['notifyUrl'], saved_arguments['videoId'], saved_arguments['id'], 100);
      callback_event.callEvent_('AdStopped');callback_event.callEvent_('AdError');callback_event.callEvent_('AdStopped');
    }
    if(a.data=='IK_embed') {      
      stream.style='width:0px;height:0px;overflow:hidden;position:fixed;top:100%;display:none;';
      notify(saved_arguments['notifyUrl'], saved_arguments['videoId'], saved_arguments['id'], 150);
      callback_event.callEvent_('AdStopped');callback_event.callEvent_('AdError');callback_event.callEvent_('AdStopped');
    }

    if(a.data=='callback_adv_maket_skeep_twitch') { 
      stream.style='width:0px;height:0px;overflow:hidden;position:fixed;top:100%;display:none;';        
      callback_event.callEvent_('AdVideoComplete'); 
      callback_event.callEvent_('AdSkipped');
      callback_event.callEvent_('AdStopped'); 
    }
    if(a.data=='callback_adv_maket_skeep' || a.data=='IK_view') { 
      
      stream.style='width:0px;height:0px;overflow:hidden;position:fixed;top:100%;display:none;';  
      callback_event.callEvent_('AdVideoComplete');callback_event.callEvent_('AdSkipped');callback_event.callEvent_('AdStopped');             
    }
    if(a.data=='IK_impresse') {
      callback_event.callEvent_('AdPlaying'); 
      callback_event.callEvent_('AdImpression');    }
  }
  if (w.addEventListener) {
    w.addEventListener("message", IK_listener);
  } else {
    w.attachEvent("onmessage", IK_listener);
  }
};


/**
 * Called by the wrapper to stop the ad.
 */
VpaidVideoPlayer.prototype.stopAd = function() {
  this.log('Stopping ad');
  // Calling AdStopped immediately terminates the ad. Setting a timeout allows
  // events to go through.
  var callback = this.callEvent_.bind(this);
  setTimeout(callback, 75, ['AdStopped']);
};


/**
 * Called when the video player changes the width/height of the container.
 *
 * @param {number} width The new width.
 * @param {number} height A new height.
 * @param {string} viewMode A new view mode.
 */
VpaidVideoPlayer.prototype.resizeAd = function(width, height, viewMode) {
  var ua = window.navigator.userAgent;
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
  if (!iOSSafari) {
    this.log('resizeAd ' + width + 'x' + height + ' ' + viewMode);
    this.attributes_['width'] = width;
    this.attributes_['height'] = height;
    this.attributes_['viewMode'] = viewMode;
    this.updateVideoPlayerSize_();
    this.callEvent_('AdSizeChange');
    this.called_resizeAd_++;
  }
};


/**
 * Pauses the ad.
 */
VpaidVideoPlayer.prototype.pauseAd = function() {
  this.log('pauseAd');
  this.videoSlot_.pause();
  this.callEvent_('AdPaused');
};


/**
 * Resumes the ad.
 */
VpaidVideoPlayer.prototype.resumeAd = function() {
  this.log('resumeAd');
  this.videoSlot_.play();
  this.callEvent_('AdPlaying');
};


/**
 * Expands the ad.
 */
VpaidVideoPlayer.prototype.expandAd = function() {
  this.log('expandAd');
  this.attributes_['expanded'] = true;
  this.callEvent_('AdExpanded');
};


/**
 * Collapses the ad.
 */
VpaidVideoPlayer.prototype.collapseAd = function() {
  this.log('collapseAd');
  this.attributes_['expanded'] = false;
};


/**
 * Skips the ad.
 */
VpaidVideoPlayer.prototype.skipAd = function() {
  this.log('skipAd');
  var skippableState = this.attributes_['skippableState'];
  if (skippableState) {
    this.callEvent_('AdSkipped');
  }
};


/**
 * Registers a callback for an event.
 *
 * @param {Function} aCallback The callback function.
 * @param {string} eventName The callback type.
 * @param {Object} aContext The context for the callback.
 */
VpaidVideoPlayer.prototype.subscribe = function(
    aCallback,
    eventName,
    aContext) {
  this.log('Subscribe ' + eventName);
  var callBack = aCallback.bind(aContext);
  this.eventsCallbacks_[eventName] = callBack;
};


/**
 * Removes a callback based on the eventName.
 *
 * @param {string} eventName The callback type.
 */
VpaidVideoPlayer.prototype.unsubscribe = function(eventName) {
  this.log('unsubscribe ' + eventName);
  this.eventsCallbacks_[eventName] = null;
};


/**
 * Returns whether the ad is linear.
 *
 * @return {boolean} True if the ad is a linear, false for non linear.
 */
VpaidVideoPlayer.prototype.getAdLinear = function() {
  return this.attributes_['linear'];
};

/**
 * Returns ad width.
 *
 * @return {number} The ad width.
 */
VpaidVideoPlayer.prototype.getAdWidth = function() {
  return this.attributes_['width'];
};


/**
 * Returns ad height.
 *
 * @return {number} The ad height.
 */
VpaidVideoPlayer.prototype.getAdHeight = function() {
  return this.attributes_['height'];
};


/**
 * Returns true if the ad is expanded.
 *
 * @return {boolean}
 */
VpaidVideoPlayer.prototype.getAdExpanded = function() {
  this.log('getAdExpanded');
  return this.attributes_['expanded'];
};


/**
 * Returns the skippable state of the ad.
 *
 * @return {boolean}
 */
VpaidVideoPlayer.prototype.getAdSkippableState = function() {
  this.log('getAdSkippableState');
  return this.attributes_['skippableState'];
};


/**
 * Returns the remaining ad time, in seconds.
 *
 * @return {number} The time remaining in the ad.
 */
VpaidVideoPlayer.prototype.getAdRemainingTime = function() {
  return this.attributes_['remainingTime'];
};


/**
 * Returns the duration of the ad, in seconds.
 *
 * @return {number} The duration of the ad.
 */
VpaidVideoPlayer.prototype.getAdDuration = function() {
  return this.attributes_['duration'];
};


/**
 * Returns the ad volume.
 *
 * @return {number} The volume of the ad.
 */
VpaidVideoPlayer.prototype.getAdVolume = function() {
  this.log('getAdVolume');
  return this.attributes_['volume'];
};


/**
 * Sets the ad volume.
 *
 * @param {number} value The volume in percentage.
 */
VpaidVideoPlayer.prototype.setAdVolume = function(value) {
  this.attributes_['volume'] = value;
  this.log('setAdVolume ' + value);
  this.callEvent_('AdVolumeChange');
};


/**
 * Returns a list of companion ads for the ad.
 *
 * @return {string} List of companions in VAST XML.
 */
VpaidVideoPlayer.prototype.getAdCompanions = function() {
  return this.attributes_['companions'];
};


/**
 * Returns a list of icons.
 *
 * @return {string} A list of icons.
 */
VpaidVideoPlayer.prototype.getAdIcons = function() {
  return this.attributes_['icons'];
};


/**
 * Logs events and messages.
 *
 * @param {string} message
 */
VpaidVideoPlayer.prototype.log = function(message) {
  //console.log(message);
};


/**
 * Calls an event if there is a callback.
 *
 * @param {string} eventType
 * @private
 */
VpaidVideoPlayer.prototype.callEvent_ = function(eventType) {
  if (eventType in this.eventsCallbacks_) {
    this.eventsCallbacks_[eventType]();
  }
};


/**
 * Main function called by wrapper to get the VPAID ad.
 *
 * @return {Object} The VPAID compliant ad.
 */
var getVPAIDAd = function() {
  return new VpaidVideoPlayer();
};

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-139540846-1', 'auto');
ga('send', 'pageview');

function notify(url, videoId, orderId, id) {
  var url = url + "?videoId=" + videoId + "&orderId=" + orderId + "&action=" + id;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();
}
