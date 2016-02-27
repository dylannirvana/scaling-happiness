<template name="MusicUpload2">

	<!-- Made this template inactive -->

<aside class="tray tray-right tray320" data-tray-height="match" style="height: 550px;">
	<h4 class="tray-title"> Upload New Track </h4>
	<!-- Image Upload Field -->
	<div class="fileupload fileupload-new admin-form mt20" data-provides="fileupload">
		<div class="section mb10">
			<label for="title" class="field prepend-icon">
				<input type="text" name="title" id="title" class="event-name gui-input br-light light" placeholder="Title">
				<label for="title" class="field-icon">
					<i class="fa fa-pencil"></i>
				</label>
			</label>
		</div>
		<div class="section mb10">
			<label for="author" class="field prepend-icon">
				<input type="text" name="author" id="author" class="event-name gui-input br-light light" placeholder="Author">
				<label for="author" class="field-icon">
					<i class="fa fa-user"></i>
				</label>
			</label>
		</div>
		<div class="section mb10">
			<label class="field prepend-icon">
				<textarea class="gui-textarea br-light h-80 bg-light" id="description" name="description" placeholder="Description"></textarea>
				<label for="description" class="field-icon">
					<i class="fa fa-align-left"></i>
				</label>
				<span class="input-footer hidden">
				<strong>Hint:</strong>Don't be negative or off topic! just be awesome...</span>
			</label>
		</div>
		<div class="row mb10 upload-track-container">
			<div class="col-xs-4">
				<span class="button btn-system btn-file btn-block ph5">
					<span class="fileupload-new">Select image</span>
					<span class="fileupload-exists">Change File</span>
					<input accept="audio/*"  id="music-file" type="file">
				</span>
			</div>
			<div class="col-xs-8 pln">
				<label for="trackPreview" class="field prepend-icon">
					<input type="text" name="trackPreview" id="trackPreview" disabled class="event-name gui-input br-light light" placeholder="No file chosen" value="{{trackPreview.name}}">
					<label for="trackPreview" class="field-icon">
						<i class="fa fa-file-audio-o"></i>
					</label>
			</label>
			</div>
		</div>
		<div class="row mb10">
			<div class="col-xs-12">
				<label for="tags" class="field prepend-icon">
					<input type="text" data-role="tagsinput" name="tags" id="tags" class="event-name gui-input br-light bg-light" placeholder="Tags">
					<label for="tags" class="field-icon">
						<i class="fa fa-tags"></i>
					</label>
				</label>
			</div>
		</div>
		<div class="fileupload-preview thumbnail m5 mt20 mb30">
			<img alt="No image" src="{{imagePreview.imgVal}}" data-holder-rendered="true" style="height: 200px; width: 100%; display: block;">
			<div class="row image-uploader">
				<div class="col-xs-4">
					<span class="button btn-dark btn-file btn-block ph5">
						<span class="fileupload-new">Select image</span>
						<span class="fileupload-exists">Change File</span>
						<input accept="image/*" id="image-file" type="file">
					</span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<button id="upload-submit" type="button" class="btn btn-info col-xs-12">
				<span class="fa fa-cloud-upload"></span>
				Submit it
				</button>
			</div>
		</div>
	</div>
</aside>
</template>
