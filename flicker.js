#pragma strict
public var thisLight: Light;
public var lamps: Transform[];
public var myPlayer : Transform;

function Start () {
	thisLight = GetComponent("Light");
}

function Update () {

}


function toFlicker()
{
	var ranNum = Random.Range(1, 6);
	for (var k=0; k<ranNum; k++)
	{
		var ranDur = Random.Range(0.2, 0.6);
		Flicker_maker(ranDur);
		var audio: AudioSource = lamps[1].GetComponent.<AudioSource>();
		audio.Play();
		//myPlayer.GetComponent(audioPlayer).PlaySound(4);
		yield WaitForSeconds(ranDur);
	}
}


function Flicker_maker(dur: int)
{

	thisLight.enabled = false;
	for(var i=0; i<lamps.length; i++)
	{
		lamps[i].GetComponent(MeshRenderer).enabled = false;
	}
	yield WaitForSeconds(dur);
	thisLight.enabled = true;
	for(var j=0; j<lamps.length; j++)
	{	
		lamps[j].GetComponent(MeshRenderer).enabled = true;
	}
}