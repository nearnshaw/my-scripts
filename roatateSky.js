#pragma strict

public var speed: float;


function Start () 
{
	speed = 0.3;
	
}

function Update () 
{
		transform.Rotate(0, 0, speed * Time.deltaTime);
}