// FFT
var sound;

var t = function( p ) {
  p.setup = function() {

    var intElemOffsetWidth = document.getElementById("fftWaveform").offsetWidth - 32;
    p.createCanvas(intElemOffsetWidth, 200);
    p.sound = new p5.AudioIn();
    p.sound.start();
    p.fft = new p5.FFT();
    p.fft.setInput(sound);
    p.sound.amp(0.9);
  };

  p.draw = function() {
    p.background(0);
    var vol = p.sound.getLevel();
    var spectrum = p.fft.analyze();
    var placementWidth = document.getElementById("fftWaveform").offsetWidth;
    var waveform = p.fft.waveform();
    p.noFill();
    p.beginShape();
    p.stroke(255,255,255); // waveform is red
    p.strokeWeight(1);
    for (var i = 0; i< waveform.length; i++){
      var x = p.map(i, 0, waveform.length, 0, placementWidth);
      var y = p.map( waveform[i], -1, 1, 0, p.height);
      p.vertex(x,y);
    }
    p.endShape();
  };
};

var myp5 = new p5(t, 'fftWaveform');

var s = function( w ) {
  w.setup = function() {

    var intElemOffsetWidth = document.getElementById("fftSpectrum").offsetWidth - 32;
    w.createCanvas(intElemOffsetWidth, 200);
    w.sound = new p5.AudioIn();
    w.sound.start();
    w.fft = new p5.FFT();
    w.fft.setInput(sound);
    w.sound.amp(0.9);
  };

  w.draw = function() {
    var vol = w.sound.getLevel();
    var spectrum = w.fft.analyze();
    var placementWidth = document.getElementById("fftSpectrum").offsetWidth;
    w.background(0);
    w.stroke(255,255,255);
    w.fill(255,255,255);
    for (var i = 0; i< spectrum.length; i++){
      var x = w.map(i, 0, spectrum.length, 1000, 0);
      var h = -w.height + w.map(spectrum[i], 0, 255, w.height, 0);
      w.rect(x, w.height, placementWidth / spectrum.length, h);
    }
    w.endShape();
  };

};
var myp5 = new p5(s, 'fftSpectrum');
