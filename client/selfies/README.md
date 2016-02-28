#Selfies

Notes on selfie-new.js

I am not familiar with this API. According to MDN, Mozilla Developer Network, the navigator.getUserMedia protocol is deprecated, and would take some time to build it from scratch.

Working with the devices CAMERA can be a danger-zone. As I received this file, the camera DID NOT TURN OFF. I hacked at it for several hours and put the question up on StackOverflow but have yet to have received a satisfactory answer.

An up-to-date API should be used if client wants to maintain this feature. Other issues may have to be taken into account.

!IMPORTANT
The inherited API is deprecated. It does not work in Safari, and poses numerous security and probably legal risks. As mentioned above, the existing code does not revoke the media object, so the camera stream stays open.

SUGGESTION: It may be better to let the user place the photo (by upload, drag-n-drop) rather than letting the app handle this. Unless this feature is considered critical for some reason, it would allow developers to concentrate on building the core features of the application.

References:
https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/API/Camera_API/Introduction
https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
