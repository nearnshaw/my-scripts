#pragma strict


	public var myAudioClip: AudioClip[];
	public var hasExploded: boolean;

function Start() {
	hasExploded = false;

}

function Update() {

}


function PlaySound(myClip)
{
//	if (hasExploded == false)
//	{
		var audio: AudioSource = GetComponent.<AudioSource>();
		audio.clip = myAudioClip[myClip];
		audio.Play();
//		if (myClip == 3)
//		{
//			hasExploded = true;
//		}
//	}
}


// I Made this
// 

//	public void PlaySound(int myClip)
//	{
//		GetComponent<AudioSource>().clip = audioClip[myClip];
//		GetComponent<AudioSource>().Play();
//	}
