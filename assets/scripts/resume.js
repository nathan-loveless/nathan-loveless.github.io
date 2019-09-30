// JavaScript Document
var connection = null;
var lastClicked = 'home';

function displayLists()
{
	
	if (window.XMLHttpRequest) 
	{
     	connection = new XMLHttpRequest();
    }
	
    else 
  	{
	  connection = new ActiveXObject("Microsoft.XMLHTTP");
  	}

	connection.open("Get", "/assets/scripts/rdata.xml", false);
	connection.setRequestHeader('Content-Type', 'text/xml');
	connection.send(null);	
	var xmlDoc = connection.responseXML;
	var root = xmlDoc.documentElement.childNodes;

	var subitem;
	var subchild;
	var child;
	var text;
	var div;
	
	for(var i = 0; i < root.length; i++)
	{					
			subitem = root[i];
		
			switch(subitem.nodeName)
			{
				case 'Data':					
					child = subitem.children;
					
					var street, town = '';
					
						for(var j = 0; j < child.length; ++j)
						{							
							switch(child[j].nodeName)
							{
								case 'Name':
									var name = child[j].innerHTML;
									var divElement = document.getElementById('name');
									divElement.innerHTML = '<h1>' + name + '</h1>';
									break;

								case 'Title':
									var title = child[j].innerHTML;
									divElement = document.getElementById('title');
									divElement.innerHTML = '<h2>' + title + '<h2>';
									break;
									
								case 'Birthday':
									var birthday = child[j].innerHTML;
									divElement = document.getElementById('birthday');
									divElement.innerHTML = birthday;
									break;
									
								case 'Email':
									var email = child[j].innerHTML;
									divElement = document.getElementById('email');
									divElement.innerHTML = email;
									break;
									
								case 'Phone':
									var phone = child[j].innerHTML;
									divElement = document.getElementById('phone');
									divElement.innerHTML = phone;
									break;

								/* This is not used in the current resume, but keeping it*/
								/*case 'Profile':
									var profile = subChild.getElementsByTagName('Profile'); 
									divElement = document.getElementById('profile_container');
									divElement.innerHTML = profile;												
									break;*/

								case 'Street':
									street = child[j].innerHTML;
									break;

								case 'Town':
									town = child[j].innerHTML;
									break;

								case 'Summary':
									var summPara = child[j].innerHTML;
									divElement = document.getElementById('about-me').append(summPara);
									//divElement.innerHTML = summPara;
									break;
									
								default:
									// Nothing									
									
							}
							
							divElement = document.getElementById('address');
							divElement.innerHTML = '<p>' + street + '</p><p>' + town + '</p>';

						}
					
				break;
					
				case 'Work':					
					child = subitem.children;

					for(j = 0; j < child.length; j++)
					{
						subchild = child[j].children;
						div = document.createElement('div');
						text = '';
						
						for(var k = 0; k < subchild.length; k++)
						{
								switch(subchild[k].nodeName)
								{
									case 'Employer':
										text += '<p>' + subchild[k].innerHTML + '</p>';
										break;
										
									case 'Title':
										text += '<p>' + subchild[k].innerHTML + '</p>';
										break;
									
									case 'Dates':
										text += '<p>' + subchild[k].innerHTML + '</p>';	
										break;
										
									case 'Location':
										text += '<p>' + subchild[k].innerHTML + '</p>';	
										break;
									
									case 'Job_Description':
										text += '</br><p>' + subchild[k].innerHTML + '</p></br></br>';	
										break;
									
									default:
										// Nothing
								}	
							}	
						div.innerHTML = text;
						document.getElementById('work-experience').append(div);
						
					}
					
				break;
					
				case 'Education':					
					child = subitem.children;

					for(j = 0; j < child.length; j++)
					{
						subchild = child[j].children;
						div = document.createElement('div');
						text = '';
						
						for(k = 0; k < subchild.length; k++)
						{
								switch(subchild[k].nodeName)
								{
									case 'Title':
										text += '<p>' + subchild[k].innerHTML + '</p>';
										break;
									
									case 'Location':
										text += '<p>' + subchild[k].innerHTML + '</p>';	
										break;
									
									case 'Dates':
										text += '<p>' + subchild[k].innerHTML + '</p>';	
										break;
										
									case 'Degree':
									text += '<p>' + subchild[k].innerHTML + '</p></br></br>';	
									break;
									
									default:
										// Nothing
								}	
							}	
						div.innerHTML = text;
						document.getElementById('education').append(div);
						
					}
					
					break;
					
				case 'Skills':					
					child = subitem.children;

					for(j = 0; j < child.length; j++)
					{
						subchild = child[j].children;
						
						div = document.createElement('div');
						var skillBar = document.createElement('div');
						var skillDiv = document.createElement('div');
						var skillDiv2 = document.createElement('div');
						
						text = '';
						var mastery = '';
						
						for(k = 0; k < subchild.length; k++)
						{
								switch(subchild[k].nodeName)
								{
									case 'Title':
										text = subchild[k].innerHTML;
										break;
									
									case 'Mastery':
										mastery = subchild[k].innerHTML;	
										break;
									
									default:
										// Nothing
								}	
							}
						
						// We need to get the value of the mastery, we will actually sew 2 divs together for this	
						var gainedSkill = mastery*2;
						var lostSkill = (100 - mastery) * 2;
						
						// div contains our skill name and skill bars
						div.style.width = '50%';
						div.style.marginTop = '10px';
						div.style.marginBottom = '10px';
						div.innerHTML = '<p>' + text + '</p>';

						// skillBar contains the 2 divs used to create the skill mastery
						skillBar.style.width = '204px'; // We need to adjust for the 2px border on left and right
						skillBar.style.paddingTop = '5px';
						skillBar.style.display = 'inline-block';

						// skillDiv is the filled "gained" skill
						skillDiv.style.width = gainedSkill + 'px';
						skillDiv.style.height = '15px';
						skillDiv.style.border = 'solid';
						skillDiv.style.borderColor = '#0000FF';//'#C4C4C4';
						skillDiv.style.backgroundColor = '#0000FF';//'#C4C4C4';
						skillDiv.style.borderWidth = '2px';
						skillDiv.style.borderRightWidth = '0px';
						skillDiv.style.float = 'left';																

							// If mastery is 100% then no other div is needed
							if(lostSkill != 0)
								{
									// skillDiv2 is the empty "lost" skill
									skillDiv2.style.width = lostSkill + 'px';
									skillDiv2.style.height = '15px';
									skillDiv2.style.border = 'solid';
									skillDiv2.borderColor = '#0000FF';//'#C4C4C4';'#C4C4C4';
									skillDiv2.style.borderWidth = '2px';
									skillDiv2.style.borderLeftWidth = '0px';
									skillDiv2.style.float = 'left';
								}

							// This else is a hack.  due to border sizes if we do not combine the 2 divs, it results in 2px loss in size
							// I hacked it to add 2 more px
							else
								{
									skillDiv.style.width = gainedSkill += 2;
								}

						// Add everything to skills container
						skillBar.append(skillDiv);
						skillBar.append(skillDiv2)
						div.append(skillBar);
						document.getElementById('skills').append(div);
					}
					
					break;
					
					case 'Information':					
						child = subitem.children;
						text = '<ul>';
						div = document.createElement('div');
					
						for(j = 0; j < child.length; j++)
						{
							text += '<li>' + child[j].innerHTML + '</li>';
						}
					
						text += '</ul>';
						div.innerHTML = text;
						document.getElementById('other-information').append(div);	
						break;
			}
	}
}

function navClicked(clicked)
{
		if(lastClicked === clicked)
		{
			return;
		}
	
	reset();
	
	lastClicked = clicked;
	var container = null;
	
	container = document.getElementById('profile-image');
	container.style.opacity = '0.1';
	container = document.getElementById('contact-information');
	container.style.opacity = '0.1';
	container = document.getElementById('header-line');	
	container.style.opacity = '0.1';
	container = document.getElementById('left-column');	
	container.style.opacity = '0.1';
	container = document.getElementById('right-column');	
	container.style.opacity = '0.1';
	//container = document.getElementById('education');	
	//container.style.opacity = '0.1';
	//container = document.getElementById('other-information');	
	//container.style.opacity = '0.1';
	container = document.getElementById('skills');	
	container.style.opacity = '0.1';
	
	// Get the div and unfade it
	var focused = document.getElementById(clicked);
	focused.style.opacity = '1.0';
	focused.style.border = '3px solid red';
	focused.style.padding = '5px';
	focused.style.boxShadow = '5px 5px 5px 5px #800000';
}

function reset()
{
	fixLast();
	var container = null;
	
	container = document.getElementById('profile-image');
	container.style.opacity = '1.0';
	container.style.border = '4px solid @text-color';
	container = document.getElementById('contact-information');	
	container.style.opacity = '1.0';
	container.style.border = 'none';
	container = document.getElementById('header-line');	
	container.style.opacity = '1.0';
	container.style.border = 'none';
	container = document.getElementById('left-column');	
	container.style.opacity = '1.0';
	container.style.border = '1px solid black';
	container = document.getElementById('right-column');	
	container.style.opacity = '1.0';
	container.style.border = '1px solid black';
	container = document.getElementById('education');	
	container.style.opacity = '1.0';
	container.style.border = 'none';
	container = document.getElementById('about-me');	
	container.style.opacity = '1.0';
	container.style.border = 'none';
	container = document.getElementById('other-information');	
	container.style.opacity = '1.0';
	container.style.border = 'none';
	container = document.getElementById('skills');	
	container.style.opacity = '1.0';
	container.style.border = '1px solid black';
}

function homeClicked()
{
	reset();
	lastClicked = 'home'
}

function contactClicked()
{	
		if(lastClicked === 'contact-information')
		{
			return;
		}
	
	reset();
	
	lastClicked = 'contact-information';
	var container = null;
	
	container = document.getElementById('profile-image');
	container.style.opacity = '0.1';
	container = document.getElementById('header-line');	
	container.style.opacity = '0.1';
	container = document.getElementById('left-column');	
	container.style.opacity = '0.1';
	container = document.getElementById('right-column');	
	container.style.opacity = '0.1';
	container = document.getElementById('education');	
	container.style.opacity = '0.1';
	container = document.getElementById('other-information');	
	container.style.opacity = '0.1';
	container = document.getElementById('skills');	
	container.style.opacity = '0.1';
	
	// Get about-me div then fade out everything else
	var focused = document.getElementById('contact-information');
	focused.style.border = '3px solid red';
	focused.style.padding = '5px';
	focused.style.boxShadow = '5px 5px 5px 5px #800000';
}

function aboutMeClicked(clicked)
{	
	if(lastClicked === clicked)
	{
		return;
	}
	
		reset();
	
	lastClicked = clicked;
	var container = null;
	
	container = document.getElementById('profile-image');
	container.style.opacity = '0.1';
	container = document.getElementById('contact-information');	
	container.style.opacity = '0.1';
	container = document.getElementById('header-line');	
	container.style.opacity = '0.1';
	container = document.getElementById('left-column');	
	container.style.opacity = '0.1';
	container = document.getElementById('education');	
	container.style.opacity = '0.1';
	container = document.getElementById('other-information');	
	container.style.opacity = '0.1';
	container = document.getElementById('skills');	
	container.style.opacity = '0.1';
	
	// Get about-me div then fade out everything else
	var focused = document.getElementById(clicked);
	focused.style.opacity = '1.0';
	focused.style.border = '3px solid red';
	focused.style.padding = '5px';
	focused.style.boxShadow = '5px 5px 5px 5px #800000';
}

function employmentClicked()
{	
	if(lastClicked === 'work-experience')
	{
		return;
	}
	
		reset();
	
	lastClicked = 'work-experience';
	var container = null;
	
	container = document.getElementById('profile-image');
	container.style.opacity = '0.1';
	container = document.getElementById('contact-information');	
	container.style.opacity = '0.1';
	container = document.getElementById('header-line');	
	container.style.opacity = '0.1';
	container = document.getElementById('right-column');	
	container.style.opacity = '0.1';
	container = document.getElementById('education');	
	container.style.opacity = '0.1';
	container = document.getElementById('other-information');	
	container.style.opacity = '0.1';
	container = document.getElementById('skills');	
	container.style.opacity = '0.1';
	
	// Get about-me div then fade out everything else
	var focused = document.getElementById('work-experience');
	focused.style.border = '3px solid red';
	focused.style.padding = '5px';
	focused.style.boxShadow = '5px 5px 5px 5px #800000';
	
}

function educationClicked()
{
	if(lastClicked === 'education')
	{
		return;
	}
	
		reset();
	
	lastClicked = 'education';
	
	var container = null;
	
	container = document.getElementById('profile-image');
	container.style.opacity = '0.1';
	container = document.getElementById('contact-information');	
	container.style.opacity = '0.1';
	container = document.getElementById('header-line');	
	container.style.opacity = '0.1';
	container = document.getElementById('left-column');	
	container.style.opacity = '0.1';
	container = document.getElementById('about-me');	
	container.style.opacity = '0.1';
	container = document.getElementById('other-information');	
	container.style.opacity = '0.1';
	container = document.getElementById('skills');	
	container.style.opacity = '0.1';
	
	// Get about-me div then fade out everything else
	var focused = document.getElementById('education');
	focused.style.border = '3px solid red';
	focused.style.padding = '5px';
	focused.style.boxShadow = '5px 5px 5px 5px #800000';
}

function otherClicked()
{
	if(lastClicked === 'other-information')
	{
		return;
	}
	
		reset();
	
	lastClicked = 'other-information';
	
	var container = null;
	
	container = document.getElementById('profile-image');
	container.style.opacity = '0.1';
	container = document.getElementById('contact-information');	
	container.style.opacity = '0.1';
	container = document.getElementById('header-line');	
	container.style.opacity = '0.1';
	container = document.getElementById('left-column');	
	container.style.opacity = '0.1';
	container = document.getElementById('about-me');	
	container.style.opacity = '0.1';
	container = document.getElementById('education');	
	container.style.opacity = '0.1';
	container = document.getElementById('skills');	
	container.style.opacity = '0.1';
	
	// Get about-me div then fade out everything else
	var focused = document.getElementById('other-information');
	focused.style.border = '3px solid red';
	focused.style.padding = '5px';
	focused.style.boxShadow = '5px 5px 5px 5px #800000';
}

function skillsClicked()
{
	if(lastClicked === 'skills')
	{
		return;
	}
	
		reset();
	
	lastClicked = 'skills';
	
	var container = null;
	
	container = document.getElementById('profile-image');
	container.style.opacity = '0.1';
	container = document.getElementById('contact-information');	
	container.style.opacity = '0.1';
	container = document.getElementById('header-line');	
	container.style.opacity = '0.1';
	container = document.getElementById('left-column');	
	container.style.opacity = '0.1';
	container = document.getElementById('right-column');	
	container.style.opacity = '0.1';
	container = document.getElementById('about-me');	
	container.style.opacity = '0.1';
	container = document.getElementById('education');	
	container.style.opacity = '0.1';
	container = document.getElementById('other-information');	
	container.style.opacity = '0.1';
	
	// Get about-me div then fade out everything else
	var focused = document.getElementById('skills');
	focused.style.border = '3px solid red';
	focused.style.padding = '5px';
	focused.style.boxShadow = '5px 5px 5px 5px #800000';
}

function fixLast()
{
	if(lastClicked != 'home')
		{
			var container = document.getElementById(lastClicked);
			container.style.border = 'none';
			container.style.padding = '0px';
			container.style.boxShadow = 'none';			
		}
	
}