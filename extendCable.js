#pragma strict
public var myTarget : Transform;
public var myOrigin : Transform;
public var myPlayer : Transform;
var cablen : float;
var fullLen : float;
var isHidden: boolean;
var isFinished: boolean;
public var rend: Renderer;
public var scrollSpeed : float;
public var textureOffset: float;
public var willFall: boolean;
public var isFalling: boolean;

function Start () {
	cablen = 0.1;
	isHidden = true;
	isFinished = false;
	isFalling = false;
	scrollSpeed = 0.14;
	rend = GetComponent.<Renderer>();
}

/////// test test

function Update () {


	if (isHidden == true){
		//normal
		if (myOrigin.GetComponent(changeMaterial).isReady == true && myTarget.GetComponent(changeMaterial).isReady == true) 
		{
			transform.position = myOrigin.GetComponent(changeMaterial).boxHeight;
			var myDirection = myTarget.GetComponent(changeMaterial).boxHeight;
			transform.LookAt(myDirection);
			fullLen = Vector3.Distance(transform.position, myDirection);
			isHidden = false;
		}
		//pinch leap
		//	if (myOrigin.GetComponent(changeMaterialPinch).isReady == true && myTarget.GetComponent(changeMaterialPinch).isReady == true)
		//	{	
		//		transform.position = myOrigin.GetComponent(changeMaterialPinch).transform.position;
		//		var myDirection2 = myTarget.GetComponent(changeMaterialPinch).transform.position;
		//		transform.LookAt(myDirection2);
		//		fullLen = Vector3.Distance(transform.position, myDirection2);
		//		isHidden = false;
		//		
		//	}
		
	}
	if (isHidden == false)
	{
		if (fullLen > cablen) 
		{
			
			if(myTarget.name == "mulesoft")	
			{
				cablen = cablen + 0.02;
				transform.localScale.z = cablen;
				transform.Translate(0,0,0.01);
			}
			else
			{
				cablen = cablen + 0.1;
				transform.localScale.z = cablen;
				transform.Translate(0,0,0.05);
			}
		}
		else if (isFinished == false)
		{
		 	isFinished = true;
		 	var audio: AudioSource = GetComponent.<AudioSource>();
			audio.Play();
		}
		else if (willFall == true)
		{
			cableFall();
			if (isFalling == true)
			{	
				var tremble = Random.Range(-0.01, 0.01);
				transform.Translate(tremble,tremble,0);
			}
		}
		
		
		
		
		if (myTarget.name == "mulesoft") //&& isFinished == true)
		{
			textureOffset = Time.time * scrollSpeed;
			rend.material.mainTextureOffset = new Vector2 (textureOffset, 0);
			//rend.material.SetTextureOffset("blue_glow2", Vector2(0,textureOffset));
		}
	}
	
	
}

function cableFall()
{
	//var myDelay = WaitForSeconds(Random.Range(15,50));
	var myDelay = 25;
	yield WaitForSeconds(myDelay);
	var audio: AudioSource = GetComponent.<AudioSource>();
	audio.Play();
	isFalling = true;
	willFall = false;
	yield WaitForSeconds(4);
	GetComponent.<Rigidbody>().constraints = RigidbodyConstraints.None;
	transform.GetComponent(Rigidbody).useGravity = true;
	transform.GetComponent(Rigidbody).AddForce(0, -1, 0, ForceMode.Force);
	myTarget.transform.GetComponent(BoxCollider).enabled = false;
	//yield WaitForSeconds(1);
	myOrigin.transform.GetComponent(BoxCollider).enabled = false;
}
