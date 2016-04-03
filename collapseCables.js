#pragma strict

public var myBody: Rigidbody;
public var allCables: Transform[];
public var allMuleCables: Transform[];
public var floatingObjects: Transform[];
public var vanishingObjects: Transform[];
public var myLight1: Light;
public var allBoxes: Transform[];
public var mule: Transform;
public var bringMule: boolean;
public var countdown: boolean;
public var startVanish: boolean;


function Start () {
	for(var i=0; i<allCables.length; i++)
	{
		allCables[i].GetComponent.<Rigidbody>().constraints = RigidbodyConstraints.FreezeAll;
		allCables[i].GetComponent.<Rigidbody>().mass = 5;
	}
	for(var n=0; n<allCables.length; n++)
	{
		allMuleCables[n].GetComponent.<Rigidbody>().constraints = RigidbodyConstraints.FreezeAll;
		allMuleCables[n].GetComponent.<Rigidbody>().mass = 5;
	}
	bringMule = false;
	startVanish = false;
	//transform.GetComponent(Rigidbody).freezePosition = true;
	//transform.GetComponent(Rigidbody).freezeRotation = true;
}

function Update () {
	if (Input.GetKeyDown("x")){
		for(var i=0; i<floatingObjects.length; i++)
			{
				floatingObjects[i].transform.GetComponent(Rigidbody).useGravity = false;
				countdown = true;
			}
		Collapse();

	}
	
	if(countdown == true)
	{
		for(var p=0; p<floatingObjects.length; p++)
		{
					floatingObjects[p].Translate(0,0.003,0);
		}
	}
	if (bringMule == true)
	{
		if (mule.position.y > mule.GetComponent(changeMaterial).boxHeight.y)
		{
			mule.Translate(0,-0.03,0);
		}
		else
		{
			bringMule = false;
			GetComponent(audioPlayer).PlaySound(7);
			backgroundSound();
			connectMule();
		}
	}
	if (startVanish == true)
	{
		for(var q=0; q<vanishingObjects.length; q++)
		{
			
			var rend = vanishingObjects[q].GetComponent.<Renderer>();
			if (vanishingObjects[q].name != "windows" || rend.material.color.a > 0.1)
			{
				for (var mat in rend.materials) {
    			rend.material.color.a -= 0.005;
    		}
    		
    		if (rend.material.color.a == 0)
    		{
    			startVanish = false;
    		}
    	
 		}
		
		//vanishingObjects[q].position.x = 100;
	}
	
	
	}
	
}

function Collapse()
{
	
				
	GetComponent(audioPlayer).PlaySound(3);
	//transform.GetComponent(Rigidbody).freezePosition = false;
	myLight1.color = Color.red;
	//myLight2.intensity = 0.1;
	yield WaitForSeconds(30);
	countdown = false;
	GetComponent(audioPlayer).PlaySound(9);
	for(var i=0; i<allCables.length; i++)
	{
		allCables[i].GetComponent.<Rigidbody>().constraints = RigidbodyConstraints.None;
		//transform.GetComponent(Rigidbody).freezeRotation = false;
		allCables[i].transform.GetComponent(Rigidbody).useGravity = true;
	}
	
	for(var j=0; j<floatingObjects.length; j++)
	{
		floatingObjects[j].transform.GetComponent(Rigidbody).useGravity = true;
	}
	
	yield WaitForSeconds(6);
	Mulify();
}

function Mulify()
{
	myLight1.color = Color.blue;
	GetComponent(audioPlayer).PlaySound(4);
	for(var k=0; k<allBoxes.length; k++)
	{
		var myHalo = allBoxes[k].GetComponent("Halo");
		//myHalo.GetType().GetProperty("enabled").SetValue(myHalo, true, null);
		//myHalo.GetType().GetProperty("size").SetValue(myHalo, 1.5, null);			
		allBoxes[k].transform.GetComponent(BoxCollider).enabled = false;		
	}	
	for(var l=0; l<allCables.length; l++)
	{
		allCables[l].transform.GetComponent(BoxCollider).enabled = false;
	}

	
	for(var p=0; p<floatingObjects.length; p++)
	{
		floatingObjects[p].transform.GetComponent(MeshCollider).enabled = false;
	}
	
	
	bringMule = true;
	startVanish = true;
}

function backgroundSound()
{
			yield WaitForSeconds(43);
			GetComponent(audioPlayer).PlaySound(6);
			//backgroundSound();
}

function connectMule()
{

	//for(var m=0; m<allMuleCables.length; m++)
	//{
	//	allMuleCables[m].;
	//}
	mule.GetComponent(changeMaterial).isReady = true;
}
