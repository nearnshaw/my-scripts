#pragma strict
public var rend: Renderer;
public var trueMaterial: Material;
public var myPlayer : Transform;
public var myLight : Transform;
public var isVisible: boolean;
public var isReady: boolean;
public var boxHeight: Vector3;
public var boxHeightNow;
public var isLooking: boolean;
public var lookingAngle: int;
public var lookCounter: int;
public var lookCounterTotal: int;
public var myHalo: Object;
public var mainColor: Color;
public var allBoxes: Transform[];
public var muleOn: boolean;


function Start () {

	rend = GetComponent.<Renderer>();
	rend.enabled = true;
	isVisible = false;
	isReady = false;
	muleOn = false;
	if (transform.name != "mulesoft")
	{
		boxHeight = transform.position;
	}
	
	if (transform.name == "salesforce" || transform.name == "cassandra" || transform.name == "amazon" )
	{
		transform.position.y = 6.3;
	}
	else if (transform.name == "workday")
	{
		transform.position.y = 5;
	}
	else if (transform.name != "mulesoft")
	{
		transform.position.y = 1.25;
	}
	lookingAngle = 25;
	lookCounter = 30;
	lookCounterTotal = 30;
	myHalo = GetComponent("Halo");
	mainColor = rend.material.color;


}

function Update () {
	if (isVisible == false && transform.name != "mulesoft")
	{	
		if (isLooking == false)
		{	
			var lookAnother = false;
			for(var i=0; i<allBoxes.length; i++)
			{
				if (allBoxes[i] != null )
				{
					if  (allBoxes[i].GetComponent(changeMaterial).isLooking == true)
					{
						lookAnother = true;
					}
				}
			}
			if(lookAnother == false)
			{
			
				if ((Vector3.Angle(transform.position - myPlayer.position, myPlayer.forward) < lookingAngle) && (myPlayer.position.z > -0.5 )) 
				{
					isLooking = true;
					//rend.material.color = Color.Lerp(mainColor, Color.red, 0.5);
					rend.material.color = Color(0.6, 0.1, 0.1, 0.3);
					//rend.material.color = Color.red;
				}
			}
		}
		else  //(isLooking == ture)
		{
			if (Vector3.Angle(transform.position - myPlayer.position, myPlayer.forward) < lookingAngle)
			{
				lookCounter = lookCounter - 1;
				//var t = (lookCounterTotal - lookCounter)/lookCounterTotal;
				//rend.material.color = Color.Lerp(mainColor, Color.red, t);
			}
			else
			{	
				isLooking = false;
				lookCounter = lookCounterTotal;
				rend.material.color = mainColor;

			}
			
		}
		
		
		if (lookCounter < 0)
		{

			rend.material = trueMaterial;
			isLooking = false;
			isVisible = true;
			//myHalo.GetType().GetProperty("size").SetValue(myHalo, 0.8, null);
			myHalo.GetType().GetProperty("enabled").SetValue(myHalo, false, null);

		}
	
	
	}	
	//isVisible == true 
	else if(Vector3.Distance(transform.position, boxHeight)> 0.1 && transform.name != "mulesoft")
	{
		transform.Translate(0,0.05,0);
	}
	else if (isReady == false && transform.name != "mulesoft")
	{
		isReady = true;
		myLight.GetComponent(flicker).toFlicker();	
		var audio: AudioSource = GetComponent.<AudioSource>();
		audio.Play();
		//myPlayer.GetComponent(audioPlayer).PlaySound(0);

	}
	else if (isReady == true && muleOn == false)
	{
		
	}
	
}