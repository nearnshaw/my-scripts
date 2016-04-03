#pragma strict


	public var myAudioClip: AudioClip[];
	//public var hasExploded: boolean;

function Start() {
	//hasExploded = false;

}

function Update() {

}


function PlaySound(myClip)
{

		var audio: AudioSource = GetComponent.<AudioSource>();
		audio.clip = myAudioClip[myClip];
		audio.Play();

}

function myStop()
{
	var audio: AudioSource = GetComponent.<AudioSource>();
	audio.Stop();
}

