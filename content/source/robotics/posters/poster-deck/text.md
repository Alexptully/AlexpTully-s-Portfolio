# Tritonics 17253 poster deck

Extracted text, one section per page. Page images: `pages/page-NN.jpg`. 30 pages.


## Page 1

Team Communications & FTC server. 
CAD collaboration.
Gantt charts to create & track workflow, outreach, 
feedback, and expert impact.
.
 COMMUNICATIONS & WORKFLOW:
 BUDGET & FINANCIAL STABILITY:
100% student-led • Co-educational robotics team
• Gracious Professionalism: respect & mentorship
• Coopertition: collaboration across teams
• Engineering mindset: curiosity, iteration, problem solving
Strategy-Hydra Model: 
• Cross-training across subteams
• Early rookie integration
• Distributed subsystem ownership
SWOT
SWOT ANALYSIS: LED TO TARGETED CONNECT
Team Development: Recruit→Nurture→Grow→Blossom
When one leader graduates, multiple trained teammates are ready to lead.
Team Planning: 
Team Structure: Subteam Process: Rotate between teams • Select based on interest • 1:1 mentoring • Own a project.
BRANDING & IDENTITY
Build Skills 
Impact - These SHOULD ALL BE LITTLE 
INFO BUBBLES ACROSS THE BOTTOM:
• 6 to Tritonic
67% f RkiFl
Recruit:
• Ran 2-Wk Summer FTC Camp 
• Open hand-on workshops.
• Hour of Code
• Intro robotics events.
• FLL & FTC Mentoring
SAME FOR THESE - USE 
GRAPHICS & NUNBERS Impact:
• 100% learn new skills.
• 100% Produces prototypes.
Constraint: 50% Budget Cut
Solution:
• Micro Funding website launched
• Budget tracking implemented
• Sustainable materials pan
“Self-Managed 
Budget + 
MicroFunding 
Platform”
___ Hours Recruiting 
Supplies Electronics $611
Hardware $790.11
Materials $803.66
Fees $494.71
Equipment Limelight $189
Apparel Team Shirts $157.50
FLL Shirts $105
TOTAL $3121
ed to extend the gift of FIRST to 
o we created a Microfunding program 
nyone can donate small amounts of 
o FIRST teams. See more on page 
We created new branding 
and Identity standard 
resources to ensure a 
consistent image an 
dmessage. 
We also create a filr of 
templates of outreach, 
business, and other key 
communications to help 
mentor those skills
Rookie Technical Training
• CAD, FTC coding & electrical 
basics.
• Communication, 
documentation & teamwork.
• Each Rookie plans an outreach 
event & designs Decode themes 
outreach material..
• Mentor feedback at every 
stage.
Engineering Development
• Each rookie completes a 
functional subsystem
• Tool safety [safety symbol] , 
materials & rapid prototypes.
• Design → CAD → Build → Test → 
Iterate
• Contribute to tele-op or 
autonomous code
• Document design decisions
Rookie Training Robot
Leadership Development
• Mentor rookies in build sessions.
• Coordinate tasks across subteams.
• Lead outreach events.
• Design curriculum or workshops.
• Connect with experts & present to 
judges.
Instead of one expert per role:
• Leadership overlap
• Structured development
• 6 Technical training stag
• 5 Major sprint reviews
• 4 Qualifier feedback loo
• 1 Formal leadership tran
• 100% Roles documented
6
9
0
5
01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 
SUSTAIN
DECODE SEASON AWARDS: 
Inspire 1st (Qual 3)
Inspire 2nd (Qual 1)
Inspire 3rd (Qual 9)
Sustain (SuperQual 2)


## Page 2

Maximize scoring efficiency 
by:
• Accurate localization
• Stable auto-aim
• Consistent launch velocity
• Fast cycle timing
• Quick auto-sorting
• Rapid fire
• 30-sec autonomous limit
• Battery voltage drop 
during matches
• Odometry drift
• Motion under acceleration
• Speed vs accuracy 
tradeoff
• Penalty risk
Control Systems
1. Analyze Problem 
2. Conceptualize Solution 
(Mathematics) 
3. Drafting (Pseudo code) 
4. Writing algorithm according 
to Pseudo code
5. Testing, tuning, and 
iteration based on results 
• Used for auto-aiming 
• 4-Steps: Collect Odometry, Limelight & IMU data → Process with 
Kalman Filter
Task System: 
• A task is a single discrete action the 
robot can perform
• Tasks are layered vertically or 
horizontally to complete a robot 
operation
• Tasks creates instant organization 
(Modularity)
• 10x faster code process
• Drivers receive 
how many artifacts 
the robot holds 
through visual 
feedback via LED 
lights.
•Artifact color and 
location is 
LED Strips
Hardware: 
• Odometry Pods: Primary localization
• Limelight: Additional localization 
• IMU: Predicts robot rotation
• Kalman Filter: Merges data (3 sources) to increase aiming accuracy
• A custom, modular autonomous pathing software
alongside a Simons Foundation professor
• PEREGRINE using Infinite Variable Calculus to create 
optimal paths. 
• Modularity enables 10 minute rapid auton creation
PEREGRINE optimisation formula:
We use PEREGRINE and Monty’s 
sorting intake and color sensors, 
to achieve:
(57 points) +2 ranking point
- Close zone: 12 artifacts 
sorted
- Far zone: 18 artifacts
What most teams use
What we use
Exponential Equations
x = y
x
5= y
Solution: Using a 
movement curve 
(right) allowing 
for a higher 
range of motion
for lower speeds.
Goal: Implement 
precise driving 
at lower speeds.
Our robot uses multiple PID controllers.
Accurately predicts 
launch power based 
on distance.
Velocity PID 
Controller ensures 
consistent firing 
using launcher wheel 
encoder feedback.
Sensor fusion 
(odometry, IMU, 
limelight) calculates 
distance to goal.
Turret auto-aiming 
uses fused 
odometry, IMU, and 
limelight data.
The benefits include:
• Adaptive adjustments
• Custom tuning + 
complexity
• Can be iterated upon 
easily
determined by 5 color sensors, relayed back to the • Can be stored in a task
driver using LED lights on the back of the robot.
01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 CONTROL
DECODE SEASON AWARDS: 
Inspire 1st (Qual 3)
Inspire 2nd (Qual 1)
Inspire 3rd (Qual 9)
Sustain (SuperQual 2)
ANALYZE TASK: CONSTRAINTS: ENGINEERING PROCESS:
CLOSED SYSTEM: 
ARCHITECTURE: ENGINEERING PROCESS:
DRIVER & PID FEEDBACK: DRIVER OPTIMIZATION:
SHOOTING REGRESSION: CUSTOM MODULAR AUTONOMOUS PATHING:


## Page 3

Team Communications & FTC server. 
CAD collaboration.
Gantt charts to create & track workflow, outreach, 
feedback, and expert impact.
 COMMUNICATIONS & WORKFLOW
 FINANCIAL SUSTAINABILITY: MICRO FUNDING 
100% student-led • Co-educational robotics team
• Gracious Professionalism: respect & mentorship
• Coopertition: collaboration across teams
• Engineering mindset: curiosity, iteration, problem solving
Strategy-Hydra Model: Instead of one expert per role:
• Cross-trained across subteams
• Early rookie integration
Operations: Analyze | Strategize | Communicate Mechanical: Design | CAD | Prototype | Test | Iterate Software: Automate | Balance | Control | Debug
Captain (Y4)
Alex T
Design Lead (Y3)
Alexa F
Software Lead (Y2)
Noah G
Code Specialist (Y2)
Martin G Milind A
Mech Lead (Y4) Fabrication (Y2)
Tarik W
Outreach (Y3)
Taran A
Build (Y3)
Leland C Ayrton K
CAD (Y2)
Naresa B
Designer (Y1)
Kerala B Emma R
Fabrication (Y1) Scout (Y1)
Grayson H
3D Modeling (Y1)
Chris B 
Software (Y1)
Rina W
CADer (Y1)
SWOT ANALYSIS: LED TO TARGETED CONNECT
When one leader graduates, multiple trained teammates are ready to lead.
Team Planning: GOAL: Ensure Long-Term Stability • Build Leadership & Pipeline • Train Rookies • Document & Track.
CONSTRAINTS: 50% Budget Cut • Limited Build Time • Skills Gaps • Graduated Lead Knowledge Loss.
Team Structure: Subteam Process: Rotate between teams • Select based on interest • 1:1 mentoring • Own a project.
 BRANDING & IDENTITY
Build Skills 
• 2-Wk Summer FTC Camp 
• Open hand-on workshops.
• Hour of Code
• Intro robotics events.
• FLL & FTC Mentoring
“Self-Managed Budget + 
Micro Funding Platform”
Rookies: Explore | Practice | Adapt | Contribute Recruited a 67% female rookie class after graduating 4 female leads.
75+ Hours Recruiting 
Goal: CAD ✔
Proud of: CAD, iteration & 
prototype testing!
Goal: iLab Tools ✔
Proud of: Learning to 
use all the machines!
Goal: Power tools ✔
Proud of: Building so 
many prototypes!
Goal: Learn to CAD ✔
Proud of: CADing the 
intake!
Goal: 3D Print ✔
Proud of: CAD & 3Dprinting Reach Material.
Goal: Java ✔
Proud of: Teleop & 
Auto-aim!
• CAD, FTC coding
 & electrical basics.
• Communication, 
documentation & teamwork.
• Each Rookie plans an outreach 
event & designs Decode themes 
outreach material.
• Mentor feedback at every stage.
Engineering Development
• Each rookie completes a functional 
subsystem.
• Tool safety, materials & rapid 
prototypes.
• Design → CAD → Build → Test 
→ Iterate
• Contribute to tele-op or 
autonomous code
• Document design decisions
• Leadership overlap.
• Structured development.
• Subsystem ownership
• Mentor rookies in 
build sessions.
• Coordinate tasks 
across subteams.
• Lead outreach events.
•  Connect with experts 
& present to judges.
01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 
SUSTAIN
DECODE SEASON AWARDS: 
Inspire 1st (Qual 3)
Inspire 2nd (Qual 1)
Inspire 3rd (Qual 9)
Sustain (SuperQual 2)
Supplies Electronics $611
Hardware $790.11
Materials $803.66
Fees $494.71
Equipment Limelight $189
Apparel Team Shirts $157.50
FLL Shirts $105
TOTAL $3121
 TEAM DEVELOPMENT: RECRUIT → NURTURE → GROW → BLOSSOM
Constraint: 50% mid-season Budget Cut.
Solution: FTC MicroFunding
• Launched Micro Funding website.
• Implemented Budget tracking.
• Utilized sustainable materials.
Developed branding & identity assets.
Created templates for outreach, business 
and key communications to develop 
power skills.
6
New 
Team Members 
To Tritonics
67%
New Rookies 
Are Female
15
NEW Students 
Joined
#32706
New FTC Team 
We Mentored
100%
Team Members 
Learned New 
Skills
100%
Team Members 
Produce 
Prototypes
100%
Team members 
Design/Plan 
Outreach
100%
Team Members More 
Confident In Trying 
New Things!
Recruit Leadership Development
Cut off one head→ two grow back.
Scenario Team Impact Strategic Response & 
Sustainability
Strengths
● Experience in advanced 
calculus, physics, materials 
science, structured 
documentation, 
accountability systems, and 
engineering workflows.
● Added design review 
checkpoints.
Standardized documentation.
● Pathmapping algorithms.
● Subsystem testing cycles from 
5% → 90%.
● Converted knowledge into team 
training modules.
● Embedded process into 
engineering workflow.
● Built reliability, documentation 
consistency, and rookie readiness.
Weaknesses ● Experienced leaders 
graduated - 50% of team.
Loss of leadership continuity.
Reduced experience.
Gender imbalance (33% female 
→ 6%).
● Leadership pipeline rebuilt within 
one season. 7 → 14 members.
● Launched & mentored 1 
additional FTC team.
Opportunitie
s
● Rookies showed strong 
interest in CAD, coding, and 
fabrication after hands-on 
recruiting events.
● Two served as STEM Center 
safety monitors.
● Component iteration cycles: 2 
→ 5+.
● Rookie technical 
participation. →Speed to 
ownership.
● Week 3: Rookies assumed 
subsystem ownership.
● Engineering task distribution 3 →
8 active contributors.
● Weekly engineering workshops.
Threats
● Rookies initially preferred 
mechanical work and coding 
roles.
● Outreach 
under-supported.
● Limited human resources for 
ongoing initiatives.
● Potential imbalance between 
technical & community 
engagement.
● Each team member designed 
and led one outreach initiative.
● Over 30 total outreach events


## Page 4

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 Sustain 01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 REACH
DECODE SEASON AWARDS: 
Inspire 1st (Qual 3)
Inspire 2nd (Qual 1)
Inspire 3rd (Qual 9)
Sustain (SuperQual 2)


## Page 5

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 Sustain 01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 REACH
DECODE SEASON AWARDS: 
Inspire 1st (Qual 3)
Inspire 2nd (Qual 1)
Inspire 3rd (Qual 9)
Sustain (SuperQual 2)
Microfunding
Our Microfunding platform lets robotics 
teams create campaigns and receive 
community support to fund programs, start 
teams, or contribute to a shared robotics fund.
Hour of Code K-8
Robotics Curriculum
CREATIVE OUTREACH MATERIALS
80+
schools 
reached
ALEX FILL THIS DESCRIPTION
• 250+ students introduced to FIRST
• 80+ transitioned into FIRST programs
• 60+ later joined FTC or FLL teams
DECODER 
WORKSHOPS: 
trained rookies to 
create DECODERS
• Nonprofits e.g. 
FreeCycles, Hudson Guild
• International 
teams e.g. Ghana, 
Philippines
Outreach-100% Student-Led
500+
Volunteering 
Hours
12+
FIRST Teams 
Mentored/Created
10,000+
Individuals 
Impacted Through 
Outreach
5,001-10,000
Curriculum Potential 
Impact
447-650
Individuals from 
Creative events
ANALYZE TASK: REACH STRATEGY/SOLUTION
Expanded access to FIRST, robotics, and STEM by:
• Recruiting new teams and members
• Mentoring FTC/FLL teams
• Publishing open resources
• Teaching STEM in underserved and international communities
CONSTRAINTS:
• Limited student time during build season
• Geographic distance (international teams)
• Varying age groups (K–12 → adults)
• Resource access gaps (materials, curriculum, code)
• Maintaining long-term engagement
• Combine high-scale curriculum with 
high-touch mentoring
• Prioritize sustainable relationships 
(weekly/monthly)
• Open-source tools to scale beyond 
in-person events
• Target diversity & international expansion
• Track hours, volunteers, audience size, 
and follow-up


## Page 6

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 Sustain 01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 CONNECT
DECODE SEASON AWARDS: 
Inspire 1st (Qual 3)
Inspire 2nd (Qual 1)
Inspire 3rd (Qual 9)
Sustain (SuperQual 2)
Strategy & Power System Experts
ANALYZE TASK: Build a regenerative network that 
expands team skills, leadership, and technical capabilities.
CONSTRAINTS: Student-led • Time • Cold outreach 
• Skill gap emerge through the season.
HOW WE CONNECT: Transform team growth areas into durable connections.
Percentage of Experts by Area of Expertise
-
Hydra ⇰ Regenerative Expert Network
We research experts & connect via Linked in or email. We also 
developed templates & track follow-up communications to 
grow each expert into a ongoing mentor.
71% Multi-Session or Ongoing Connections
28% Generated Secondary Connections
Student-Led Sustained Relationships
10% Game Strategy & Performance
16% Software & Controls
18% Fabrication & Manufacturing
26% Hardware & Reliability
30% Leadership, Ops & Communications
150+ Hours 
Expert Engagement


## Page 7

Quantified Metrics
Analyze Task: 
01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 
Connect 
• Improve robot performance
• Strengthen leadership & 
operations
• Expand outreach effectiveness
• Build sustainable mentorship 
pipelines
Constraints: 
• Limited time during build 
season
• Access to high-level 
experts
• Converting 1-time 
meetings into sustained 
mentorship
• Ensuring applied impact
• Maintaining student-led 
ownership
Connect Strategy: 
Power Skill & Operational Experts
• Identify skill gaps → seek targeted 
expertise
• Cold outreach + alumni + network 
introductions
• Prepare specific technical questions before 
meetings
• Follow-up with documented application
• Convert 1x interactions into ongoing 
feedback loops
• Track all engagement (hours, category, 
outcomes)
Joe Terpenning, Infinite 
Technologies Runs 
prosthetics teams ⇰ Planning
Matt McCambridge, Areté Education 
⇰ Planning
Khaliha Hawkins ⇰ Budget
Why: Budget & timelines were 
reactive instead of planned. We 
wanted advice on planning for the 
future.
We Learned:
• Built a working budget sheet
• Broke season into dated milestones
• Assigned ownership for materials
We Improved:
• Live budget tracker used weekly
• Milestone deadlines posted and 
tracked
• Clear subteam accountability
Operation & Accountability: 
Budget, materials tracking, outreach 
supervision, calendar
Emily Jabbour ⇰ Leadership 
Development
Giovanni Palacio ⇰ Team Building
Ila Chakrapani ⇰ Team Building
Shirley Zhang ⇰ Leadership 
Development
Why: Leadership roles were unclear 
& recruiting was inconsistent.
We Learned:
• Defined responsibilities for each 
lead role.
• Structured team-building sessions.
• Identified barriers for girls in 
leadership.
We Improved:
• Published role expectations.
• Paired new members with 
experienced leads.
• Increased retention of new 
members.
Team Culture & Leadership: 
Recruiting, gender equity, respectful 
dialogue, values
Communication & 
Representation: Public 
speaking, documentation, 
portfolio, social media.
Serena Sundeberg ⇰
Communications
Khaliha Hawkins ⇰ Social Media
Shirley Zhang ⇰ Marketing
Why: Technical work was strong 
but hard to follow in presentation
We Learned:
• Restructuring portfolio sections
• Simplifying technical 
explanations
• Standardizing slide design
We Improved:
• Clear judging presentation 
format
• Consistent outreach messaging
• Organized documentation 
structure
Data: 
38 Experts Engaged
150+ Engagement Hours
71% of Sessions Repeated
Expert Distribution: 
Technical Domains:
Hardware & Reliability - 9
Fabrication & Manufacturing - 7
Software & Controls - 6
Game Strategy - 4
Organizational Domains:
Leadership Development - 4
Operations & Planning - 3
Communications & Branding - 3
How Connecting 
Strengthened us: 
Technical Impact:
• Custom pathfinding 
algorithm built
• Launch force modeling 
refined
• Sensor-based launcher 
speed control
• CNC tolerance improvements
• Reduced mechanical failure
Organizational 
Impact:
 • Defined 
leadership roles
 • Budget tracking 
implemented
 • Documentation 
standardized
 • Judging 
presentation 
refined
“Most engagements extended 
beyond a single meeting.”
Develop targeted relationships 
with technical and professional 
experts to:
26 Technical Experts
10 Organizational / 
Leadership Experts
100% Student-Led 
Initiated
10+ Secondary 
Introductions Generated
“implemented expert feedback 
directly into robot subsystems”


## Page 8

Analyze Task: 
Expanded access to FIRST,
robotics, and STEM by:
• Recruiting new teams and 
members
• Mentoring FTC/FLL teams
• Publishing open resources
• Teaching STEM in 
underserved and international 
communities
Constraints:
• Limited student time during 
build season
• Geographic distance 
(international teams)
• Varying age groups (K–12 →
adults)
• Resource access gaps (materials, 
curriculum, code)
• Maintaining long-term 
engagement
Reach Strategy:
• Combine high-scale curriculum 
with high-touch mentoring
• Prioritize sustainable relationships 
(weekly/monthly)
• Open-source tools to scale beyond 
in-person events
• Target diversity & international 
expansion
• Track hours, volunteers, audience 
size, and follow-up
Organizations Engaged: 
Includes:
• K–8 Schools e.g. All Saints Episcopal Day School 
• High Schools e.g. Regis, Saint Peters, Hoboken High
• FTC / FRC Teams e.g. Tic Tac Tech, Roboctopus, Dynamic
• FLL Teams (5 mentored weekly)
• Nonprofits e.g. FreeCycles, Hudson Guild
• International teams e.g. Ghana, Philippines
• Senior Centers
• STEM labs
Total Outreach Hours: 
≈ 500+ volunteer hours logged
(Several long-term weekly engagements: 
41–50 hr blocks, 126–150 hr project, 100–125 hr 
camp)
≈ 35+ unique organizations
People Reached: 
10,000+ Individuals
 Impacted
Large-scale:
• Curriculum: 
5,001–10,000 
potential reach
• Instagram: 
1,001–5,000
• Media outreach: 1,001–5,000
Direct instruction / events:
• 201–300 (Hour of Code)
• 150–200 (Open Houses)
• 76–100 (Demo events)
• 20–50 repeated small-group 
mentoring
Teams We Directly Mentored: 
12+ FIRST Teams Mentored or Created
• 5 FLL Teams (weekly)
• 6+ FTC Teams mentored
• 1 FTC team created (Tic Tac Tech (made cities))
• 1 FLL program built (Blackfleet)
• MicroFunding support to FRC + FTC
Sustained Engagement: 
60%+ Multi-Session Engagements
Student 
Leadership: 
100% Student-Led 
Outreach
Initiated by:
• Current Teammates — 
Majority
• Alumni — Limited 
portion
From earlier Connect 
analysis:
76% Current Student 
Initiated
24% Alumni Initiated
Quantified Impact
01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 Reach
01110011 01110100 01111001 01101001 01101001 
500+ Hours of Direct Outreach
Weekly or Monthly programs:
• FLL Teams (5 weekly)
• Ghana FTC (monthly)
• All Saints NJ (monthly)
• Senior Center (ongoing)
• FDAVII STEM Lab (weekly)
• Parent/facul
recruitment


## Page 9

Leadership Pipeline Total Outreach Hours: 
Metrics: 
Structural DATA
Analyze Task: Build a regenerative network 
that expands team skills, leadership, and 
technical capabilities.
Constraints: 
• Annual senior graduation
• Skill gaps in rookies
• Limited build-season time
• Technical complexity 
increasing yearly
• Risk of knowledge loss
Strategy-Hydra Model: 
Instead of one expert per role:
• Cross-training across subteams
• Leadership overlap
• Early rookie integration
• Month-by-month structured 
development
• Distributed subsystem ownership
12-month sustain cycle
Structured Leadership Development Stages:
April–May → Transition + Reflection
June–August → Rookie Skill Expansion
September–November → Structured Engineering Sprints
December–February → Subsystem Ownership
March → Succession & Documentation
Quantifiable 
Elements: 
• 6 structured technical training stages
• 4 major sprint reviews
• 3 qualifier feedback loops
• 1 formal leadership transition plan
• 100% roles documented
Financial & Operational 
Sustainability: 
• Micro Funding website launched
• Budget tracking implemented
• Parent/faculty judge recruitment
• Alumni re-engagement
“Self-Managed 
Budget + 
MicroFunding 
Platform”
Rookie 
Development:
• FTC Camp built pipeline
• 6 new members recruited
• 1 new FTC team formed
• 5 FLL teams mentored
• Stage-based/ 1:1 training
(Java, Fusion, Safety, Tools, 
Machining, Presentation)
6 Structured Skill Stages 
Before Championships
Custom Gantt Chart
From timeline + role notes:
• Building leadership redundancy
• Training rookies before season
• Documenting process & lessons 
learned
• Distributing technical ownership
• Creating financial and outreach 
stability
Cut off one head → two grow back.
Leadership is not vertical — it is 
networked.


## Page 10

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 Control
01110011 01110100 01111001 01101001 01101001 
Analyze Task: 
Maximize scoring efficiency 
by:
• Accurate localization
• Stable auto-aim
• Consistent launch velocity
• Fast cycle timing
• Seamless Auto → TeleOp 
transition
Constraints: Control Strategy: 
• 30-sec autonomous limit
• Battery voltage drop 
during matches
• Odometry drift
• Motion under acceleration
• Speed vs accuracy 
tradeo
ff
• Single-driver operation
• Sensor-based localization (Odometry + 
IMU + AprilTags)
• Closed-loop PID control (Turret + 
Flywheel + Drive)
• Modular state machine architecture
• Continuous feedback correction
• Data carryover from Auto → TeleOp
• Driver abstraction (software handles 
sequencing)
Control Systems
Sensor → Model → PID → Motor →Sensor
Sensors Used:
• Odometry Pods (10ms updates)
• Limelight 3A (AprilTag vision)
• IMU
• Motor encoders
• Transfer motor current sensing
• Color sensors (sorting)
Architecture: 
Key Innovations: 
Custom Pathing Engine (Peregrine 
replacement)
Infinite Variable Calculus Modeling
Modular Autonomous Functions
Auto-Aim Independent of 
Drivetrain
Velocity Recovery Optimization
Nonlinear Joystick Mapping
Quantified Performance Metrics: 
Autonomous:
• 9-ball auto (Close + Far)
• Path deviation reduced to ± 0.2 cm
• Auto path completion time: 16 sec
Control Precision:
• Launch RPM maintained ± 1600%
• Turret correction every 50ms
• 75ms release timing
• 10ms odometry updates
Measured improvements 
across iterations:
• Localization error ↓ 30%
• RPM variance ↓ 30%
• Cycle 150 ↓ 30%
Engineering Process: 
Auto v.s. Teleop: 
Autonomous:
• Predictive pathing
• Sensor-based aim
• State machine execution
TeleOp:
• Continuous auto-aim 
correction
• RPM stabilization
• Driver-level abstraction
Launch Regression:
1. External data from 
odometry → location 
on the field
2. Distance from goal 
calculated using 
distance formula
3. Distance attributed 
to launcher velocity 
using the equation 
v = d • 2.64 + 1013
4. Automatic, 
continuous adjustment 
without driver input
Number of trials: 200
Successful shots: 189
Misses: 11
TeleOp:
• 15 cycles per match
• 3 artifacts per cycle
• 45 artifacts max
• 195 points potential
Reliability:
• 98% AprilTag lock reliability
• 100% odometry data availability
Iteration 1:
 Hardcoded paths
 No localization
 No auto-aim
Iteration 2:
✓ PID straight-line correction
✓ Sensor integration
✓ Partial auto-aim
Iteration 3:
✓ AprilTag localization
✓ State carryover
✓ Optimized velocity recovery


## Page 11

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 Control
01110011 01110100 01111001 01101001 01101001 
Analyze Task: 
Maximize scoring efficiency 
by:
• Accurate localization
• Stable auto-aim
• Consistent launch velocity
• Fast cycle timing
• Quick auto-sorting
• Rapid fire 
Constraints: Control Strategy: 
• 30-sec autonomous limit
• Battery voltage drop 
during matches
• Odometry drift
• Motion under acceleration
• Speed vs accuracy 
tradeoff
• Penalty risk
• Sensor-based localization (Odometry + 
IMU + AprilTags)
• Closed-loop PID control (Turret + 
Flywheel + Drive)
• Modular state machine architecture
• Continuous feedback correction
• Data carryover from Auto → TeleOp
• Driver abstraction (software handles 
sequencing)
Control Systems
Sensor → Model → PID → Motor →Sensor
Sensors Used:
• Odometry Pods (10ms updates)
• Limelight 3A (AprilTag vision)
• IMU
• Motor encoders
• Transfer motor current sensing
• Color sensors (sorting)
Architecture: 
Key Innovations: 
Custom Pathing Engine (Peregrine 
replacement)
Infinite Variable Calculus Modeling
Modular Autonomous Functions
Auto-Aim Independent of 
Drivetrain
Velocity Recovery Optimization
Nonlinear Joystick Mapping
Quantified Performance Metrics: 
Autonomous:
• 9-ball auto (Close + Far)
• Path deviation reduced to ± 0.2 cm
• Auto path completion time: 16 sec
Control Precision:
• Launch RPM maintained ± 1600%
• Turret correction every 50ms
• 75ms release timing
• 10ms odometry updates
Measured improvements 
across iterations:
• Localization error ↓ 30%
• RPM variance ↓ 30%
• Cycle 150 ↓ 30%
Engineering Process: 
Auto v.s. Teleop: 
Autonomous:
• Predictive pathing
• Sensor-based aim
• State machine execution
TeleOp:
• Continuous auto-aim 
correction
• RPM stabilization
• Driver-level abstraction
Launch Regression:
1. External data from 
odometry → location 
on the field
2. Distance from goal 
calculated using 
distance formula
3. Distance attributed 
to launcher velocity 
using the equation 
v = d • 2.64 + 1013
4. Automatic, 
continuous adjustment 
without driver input
Number of trials: 200
Successful shots: 189
Misses: 11
TeleOp:
• 15 cycles per match
• 3 artifacts per cycle
• 45 artifacts max
• 195 points potential
Reliability:
• 98% AprilTag lock reliability
• 100% odometry data availability
Iteration 1:
 Hardcoded paths
 No localization
 No auto-aim
Iteration 2:
✓ PID straight-line correction
✓ Sensor integration
✓ Partial auto-aim
Iteration 3:
✓ AprilTag localization
✓ State carryover
✓ Optimized velocity recovery


## Page 12

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 Design 
Building a robot that:
1) Intakes 3 artifacts at once
2) Sorts and stores artifacts 
efficiently
3) Rapid-fires into the launcher
4) Maintains accuracy at close and 
far zones
5) Minimizes cycle time
6) Balances weight and durability
- Modular subsystem 
- Integrated sorting & 
transfer system
- Optimized arc-ramp geometry
- Adjustable-angle launcher
- 2-ratio turret system
- Iterative prototype testing
 (rookie-built)
Bumpers
Polycarbonate bumpers 
increase static & 
collision resistance
3-Artifact Intake
Intakes three artifacts 
simultaneously.
Adjustable Launcher
Launches artifacts from 
any range using a 
flywheel. 
Turret
Internal blocker 
allows rapid 
firing at both 
long and close 
range, while the 
1:1 turret gear 
ratio provides 
constant, 
instant 
automatic 
aiming.
Identify Constraints
Before each sprint we 
collaborate to set goals, 
strategy, and timelines
SET GOALS & STRATEGY BRAINSTORM & SKETCH IDEAS
SOFTWARE
Design entire robot 
based on ideation 
and input
CAD MODELING
COMPUTATIONAL OPTIMIZATION TEST EFFICACY & ITERATE FABRICATE PROTOTYPE
Prototyping
Rookie-led
manufacturing of 
the robot from 
CAD
Use modularity to 
iterate quickly
Test + Video physics
Collect data
Controlled, 
repeatable, accurate
testing
• Materials Selection
• Risk Management
Design Process
Robot (Monty) Overview
Iteration & Testing: 
Iteration 1:
 Flat ramp → random artifact position
 Left-sided hole → slow transfer
 No turret
 Excess rails → high weight
Iteration 3:
✓ Centered hole → shorter path
✓ Shortened vectoring slots
✓ Intake repositioned to prevent dual 
jams
✓ Rubber bands replaced gecko wheels
Measured Improvements:
• Transfer time ↓ ___%
• Intake consistency ↑ ___%
• Weight ↓ ___%
• Jam rate ↓ ___%
Documentation: 
• Master sketches
• CAD revision tracking
• Iteration logs
• Failure analysis
• Quantified prototype comparison
Analyze Task: Strategy：
Iteration 2:
✓ Vectoring slots added
✓ Two-rail system
✓ Adjustable system integrated
✓ Smaller wheel → lower weight


## Page 13

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 Design 
Design Process
Robot (Monty) Overview
Rapid transfer
Multiple sets of 
counterrollers 
arrange artifacts 
into a straight 
line for sorted 
rapid fire. 
Modular Components
Following our 8 
screw rule, each 
subsystem is 
removable in a 
maximum of 45 sec.
Sorting intake supports intake, 
storage, and 150 ms sorted 
rapid fire, a rare capability 
among teams.
Ballast Weights
steel blocks to optimize 
the center of mass for 
faster, more stable 
movement
Ergonomic Handles
SET GOALS & STRATEGY BRAINSTORM & SKETCH IDEAS CAD MODELING
TEST EFFICACY & ITERATE FABRICATE PROTOTYPE COMPUTATIONAL OPTIMIZATION
After defining the design 
challenge and our 
solutions, we set goals and 
a timeline via the GANTT 
chart and Canvas.
We all come together to 
discuss and sketch our 
design ideas until we decide 
upon the best theoretical 
design.
We translate the final 
design sketch into a 3D 
model using Onshape, 
where we use advanced 3D 
modeling techniques such 
as Master Sketches.
We then use industry-standard 
software to simulate the stresses 
the parts will experience in order 
to ensure functionality before 
manufacturing.
We use laser cut wood 
and 3D printing to rapidly 
prototype and iterate 
components and 
subsystems.
Using advanced data 
tracking methods such as 
Vernier analysis we analyse 
performance, using the data 
to improve future iterations.
Intake Turret
Internal blocker 
enables rapid firing, 
while the 1:1 turret gear 
ratio allows instant 
automatic aiming.
Placed at the robot’s 
center of mass with TPU 
grips for easy lifting.


## Page 14

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 Design 
Design Process
Robot (Monty) Overview
Rapid transfer
Modular Components
Ballast Weights
Ergonomic Handles
SET GOALS & STRATEGY BRAINSTORM & SKETCH 
IDEAS
CAD MODELING
COMPUTATIONAL 
OPTIMIZATION
TEST EFFICACY & ITERATE FABRICATE PROTOTYPE
Set goals and a 
timeline using a 
Gantt chart and 
Canvas.
Team discusses and 
sketches ideas to 
choose the best 
design
Translate final 
sketches into 3D 
models using 
advanced techniques 
in Onshape
Simulate part stresses 
with industry software 
before manufacturing
Use laser cutting 
and 3D printing 
for rapid 
prototyping
Using Vernier 
analysis, we track 
performance data to 
improve future 
iterations.
Intake
Turret
MATERIALS SELECTION 
PROTOTYPING
● Early prototypes used wooden 
plates for fast, inexpensive testing
● Modular design allowed rapid 
changes between versions
● Completed 4 intake, 3 launcher, and 
2 transfer iterations
● Final design was then built in metal
DESIGN INSPIRATION
● Intake inspired by modular 
active intake by Clearbot 
Robotics Alligator Robot
● Uses roller-based intake, sorting 
and storage concepts for 
efficient collection
● Adapted intake ideas into our 
robot mechanisms
PARAMETRIC MASTER SKETCHES
● Robot aesthetics are inspired by 
Triton, our team namesake
● Wave-like body structure represents 
the ocean and our design theme
● Blue coloring reflects water
AESTHETIC INSPIRATION: WAVES 
● parametric master sketches to define 
part placement 
● One variable can update the entire 
design, speeding iteration by 50%
● Increases CAD usability for new team 
members


## Page 15

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 
Innovate
V1 evaluation: 
Rapid-Fire Transfer System: 
• Arc-shaped ramp geometry
• Shortened path via centered hole
• Current sensing for clog detection
V2 evaluation: 
V3 evaluation: 
• Prestages artifacts automatically
• Controlled feed spacing (75ms release)
3-Wide Active Band Intake:
Integrated Sorting & 
Storage: 
97%intake rate
intake ⟶ 5s launcher time
Prototype 2:
✓ Vectoring slots ✓ Dual rail 
control
85%intake rate intake → 7slauncher time
 Flat ramp → random positioning
 Off-center transfer → longer path
100% intake rate
2s
Prototype 3:
✓ Centered transfer ✓ Rubber-band grip
✓ Jam mitigation through intake repositioning
intake ⟶
launcher time
• Intakes 3 artifacts simultaneously
• Rubber-band grip for consistent traction
• Vectoring geometry to guide position
• Adjustable hood
• Backspin reduction
• Velocity PID stabilization
Launcher Optimizations: 
Innovate Problem: 
Standard intake + launcher systems: 
•Intake one artifact at a time
•Require repositioning between 
shots
•Lose time during transfer
•Separate intake and storage 
subsystems
Constraints:
• Artifact variability
• Jam risk with 
multi-intake
• Transfer speed 
bottlenecks
• Limited robot footprint
• Launcher consistency 
under load
Innovation Strategy:
Integrate intake, storage, 
sorting, and transfer into one 
compact, modular subsystem 
capable of:
● Simultaneous 3-artifact 
intake
● Prestaging for rapid fire
● Controlled velocity transfer
● Minimal driver intervention
What Makes it Innovative?
Innovation: 
The compact 
integration of intake + 
sorting + storage + 
transfer into one 
synchronized 
subsystem, most teams 
separate these.
Quantified Advantage: 
• 3 artifacts per intake cycle
• 15 cycles per teleop
• 45 artifacts max
• 75ms inter-shot spacing
• Transfer path shortened by 50%
• Jam rate reduced 80%
Engineering 
Principles Applied: 
• Friction modeling
• Force distribution
• Path length optimization
• Compression tuning
• Compact subsystem integration
The Innovation
Fast multi-artifact scoring with 
minimal cycle time.
Game challenge required:


## Page 16

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 
Innovate
Develop a stable hooded launcher 
and turret with experimentally 
optimized compression, inertia, and 
launch angles. 
Our unique 8-bearing 
hood system allows the 
hood to adjust without 
sacrificing stability, 
leading to zero backlash
and enabling near 
instantaneous aiming.
LESSONS LEARNED
V1 ▼Dual-rail hood 
leads to excess 
friction
▲Servo-actuated 
turret → compact
+ effective
▼HTD5 belts are 
inefficient
▲Smooth hood
increases launch 
speed
▲Servo turret 
improved using 
metal gears
▲GT2 pulleys →
higher efficiency
IMPROVEMENTS V2
Unique Adjustable Hood
Launcher V1 vs V2
INNOVATIVE SOLUTIONS
V3 - Qualifier 1
3-wide intake: expands intake area to 18in.
Flat ramp: Jams & no sorting capability.
Offset transfer port: simple ball queuing.
V2 - Qualifier 3
Vectoring slots: Guide and retain artifacts.
Flat ramp: Inconsistent alignment & jams.
Updated offset port: Limits transfer speed.
V3 - Qualifier 9
Centered port: Shorter transfer path,speed.
Shortened vectoring slots: drag.
Artifact jam risk: mitigated by placement.
V4 - Super Qualifier 2
Sorting Paddles
Push artifacts into transfer in desired order and 
block excess balls preventing overintaking
Iterations
We use a one of a 
kind (out of ~4000
teams surveyed) 
intake-sorter hybrid
Step-by-step sorting 
process (GPP → PPG)
Costs:
❌Potentially 
slow unload 
speed
❌Increased 
complexity
Benefits:
✅ Artifact sorting
✅ Ultra-wide 18 in intake
✅ Overintaking prevention
✅ Intaking 3 artifacts 
simultaneously
Color Sensor Array
Tracks positions of each artifact 
inside the intake 
Risk Mitigation:
✅ Artifact queue in 
transfer for 100ms 
unload rate
✅ Modular intake for 
faster iterations
Our Innovative
transfer pulls in 
pre-sorted artifacts 
from the intake and 
stores them linearly to 
achieve an ultra fast 
100 millisecond 
sorted transfer to the 
launcher, which no 
other team possesses 
(out of ~4000 teams 
surveyed). 
LESSONS LEARNED
V1 ▼Inconsistent 
intake from intake.
▼Jams if holding 
more than one 
ball at a time.
▼Slow transfer to 
launcher 1.5sec
IMPROVEMENTS V2
▲Added 2 
intaking 
counter-rollers
▲Simultaneously 
transfers 2 
artifacts
▲Rapid transfer 
100 millisec
Unique Adjustable Hood
Launcher V1 vs V2


## Page 17

Leadership Pipeline Metrics: Total Outreach Hours: 
Structural DATA
01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 Sustain
01110011 01110100 01111001 01101001 01101001 
Analyze Task: 
Ensure long-term team continuity 
by:
• Building leadership redundancy
• Training rookies before season
• Documenting process & lessons 
learned
• Distributing technical ownership
• Creating financial and outreach 
stability
Constraints: 
• Annual senior graduation
• Skill gaps in rookies
• Limited build-season 
time
• Technical complexity 
increasing yearly
• Risk of knowledge loss
Strategy-Hydra Model: 
Cut off one head → two grow back.
Instead of one expert per role:
• Cross-training across subteams
• Leadership overlap
• Early rookie integration
• Month-by-month structured development
• Documented transitions
• Distributed subsystem ownership
Leadership is not vertical — it is networked.
Roles: 
Total Defined Roles:
15
Cross-Functional Tags 
per Role: avg. 3 areas
Categories include:
Mechanical
CAD
Fabrication
Electrical
Control
Strategy
Outreach
Operations
Shows built-in 
redundancy
12-month sustain cycle
Structured Leadership Development 
Stages:
April–May → Transition + Reflection
June–August → Rookie Skill Expansion
September–November → Structured 
Engineering Sprints
December–February → Subsystem 
Ownership
March → Succession & Documentation
Quantifiable Elements: 
• 6 structured technical training stages
• 4 major sprint reviews
• 3 qualifier feedback loops
• 1 formal leadership transition plan
• 100% roles documented
Skill Redundancy Metrics: 
From role distribution:
Mechanical present in 9 roles
CAD present in 7 roles
Fabrication present in 6 roles
Control/Code present in 4 roles
Outreach present in 12 roles
Financial & Operational 
Sustainability: 
• MicroFunding website launched
• Budget tracking implemented
• Parent/faculty judge recruitment
• Alumni re-engagement
“Self-Managed 
Budget + 
MicroFunding 
Platform”
Each critical 
subsystem 
supported by 
2–4 trained 
members
Rookie Development:
From timeline + role notes:
• FTC Camp built pipeline
• 6 new members recruited
• 1 new FTC team formed
• 5 FLL teams mentored
• Stage-based/ 1:1 training (Java, 
Fusion, Safety, Tools, Machining, 
Presentation)
6 Structured Skill Stages Before 
Championships
Documentation & 
Knowledge 
Preservation:
• Master sketches
• Documentation protocols 
established August
• Portfolio updates each qualifier
• Post-Qual analysis cycles
• Lessons learned archived in March
Documented Every Sprint + Every 
Qualifier
Hydra Data:
Custom Gantt Chart


## Page 18

Quantified Metrics
01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 
Connect 
Analyze Task: 
Develop targeted relationships with 
technical and professional experts 
to:
• Improve robot performance
• Strengthen leadership & 
operations
• Expand outreach effectiveness
• Build sustainable mentorship 
pipelines
Constraints: 
• Limited student time 
during build season
• Access to high-level experts
• Converting 1-time meetings 
into sustained mentorship
• Ensuring applied impact 
(not passive advice)
• Maintaining student-led 
ownership
Connect Strategy: 
Power Skill & Operational Experts
• Identify skill gaps → seek targeted 
expertise
• Cold outreach + alumni + network 
introductions
• Prepare specific technical questions before 
meetings
• Follow-up with documented application
• Convert 1x interactions into ongoing 
feedback loops
• Track all engagement (hours, category, 
outcomes)
Joe Terpenning, Infinite Technologies 
Runs prosthetics teams ⇰
Planning
Matt McCambridge, Areté Education 
⇰ Planning
Khaliha Hawkins ⇰ Budget
Why: Budget & timelines were reactive 
instead of planned. We wanted advice 
on planning for the future.
We Learned:
• Built a working budget sheet
• Broke season into dated milestones
• Assigned ownership for materials
We Improved:
• Live budget tracker used weekly
• Milestone deadlines posted and 
tracked
• Clear subteam accountability
Operation & Accountability: 
Budget, materials tracking, outreach 
supervision, calendar
Emily Jabbour ⇰ Leadership 
Development
Giovanni Palacio ⇰ Team Building
Ila Chakrapani ⇰ Team Building
Shirley Zhang ⇰ Leadership 
Development
Why: Leadership roles were unclear 
& recruiting was inconsistent.
We Learned:
• Defined responsibilities for each 
lead role.
• Structured team-building sessions.
• Identified barriers for girls in 
leadership.
We Improved:
• Published role expectations.
• Paired new members with 
experienced leads.
• Increased retention of new 
members.
Team Culture & Leadership: 
Recruiting, gender equity, respectful 
dialogue, values
Communication & 
Representation: Public 
speaking, documentation, 
portfolio, social media.
Serena Sundeberg ⇰
Communications
Khaliha Hawkins ⇰ Social Media
Shirley Zhang ⇰ Marketing
Why: Technical work was strong 
but hard to follow in presentation
We Learned:
• Restructuring portfolio sections
• Simplifying technical 
explanations
• Standardizing slide design
We Improved:
• Clear judging presentation 
format
• Consistent outreach messaging
• Organized documentation 
structure
Data: 
38 Experts Engaged
150+ Engagement Hours
71% Multi-Session / 
Sustained
26 Technical Experts
10 Organizational / 
Leadership Experts
100% Student-Led Initiated
10+ Secondary 
Introductions Generated
Expert Distribution: 
Technical Domains:
Hardware & Reliability — 9
Fabrication & Manufacturing — 7
Software & Controls — 6
Game Strategy — 4
Organizational Domains:
Leadership Development — 4
Operations & Planning — 3
Communications & Branding — 3
How Connecting 
Strengthened us: 
Technical Impact:
• Custom pathfinding 
algorithm built
• Launch force modeling 
refined
• Sensor-based launcher 
speed control
• CNC tolerance improvements
• Reduced mechanical failure
Organizational 
Impact:
 • Defined 
leadership roles
 • Budget tracking 
implemented
 • Documentation 
standardized
 • Judging 
presentation 
refined
“Most engagements extended 
beyond a single meeting.”


## Page 19

Analyze Task: 
Expanded access to FIRST,
robotics, and STEM by:
• Recruiting new teams and 
members
• Mentoring FTC/FLL teams
• Publishing open resources
• Teaching STEM in underserved 
and international communities
Constraints:
• Limited student time during 
build season
• Geographic distance 
(international teams)
• Varying age groups (K–12 →
adults)
• Resource access gaps 
(materials, curriculum, code)
• Maintaining long-term 
engagement
Reach Strategy:
• Combine high-scale curriculum 
with high-touch mentoring
• Prioritize sustainable
relationships (weekly/monthly)
• Open-source tools to scale 
beyond in-person events
• Target diversity & international 
expansion
• Track hours, volunteers, audience 
size, and follow-up
Organizations Engaged: 
Includes:
• K–8 Schools e.g. All Saints Episcopal Day School 
• High Schools e.g. Regis, Saint Peters, Hoboken High
• FTC / FRC Teams e.g. Tic Tac Tech, Roboctopus, Dynamic
• FLL Teams (5 mentored weekly)
• Nonprofits e.g. FreeCycles, Hudson Guild
• International teams e.g. Ghana, Philippines
• Senior Centers
• STEM labs
Total Outreach Hours: 
500+ Hours of Direct Outreach
≈ 500+ volunteer hours logged
(Several long-term weekly engagements: 
41–50 hr blocks, 126–150 hr project, 100–125 
hr camp)
≈ 35+ unique organizations
People Reached: 
10,000+ Individuals
 Impacted
Large-scale:
• Curriculum: 
5,001–10,000 
potential reach
• Instagram: 
1,001–5,000
• Media outreach: 1,001–5,000
Direct instruction / events:
• 201–300 (Hour of Code)
• 150–200 (Open Houses)
• 76–100 (Demo events)
• 20–50 repeated small-group 
mentoring
Teams Directly Mentored: 
12+ FIRST Teams Mentored or Created
• 5 FLL Teams (weekly)
• 6+ FTC Teams mentored
• 1 FTC team created (Tic Tac Tech (made cities))
• 1 FLL program built (Blackfleet)
• MicroFunding support to FRC + FTC
Sustained Engagement: 
60%+ Multi-Session Engagements
Weekly or Monthly programs:
• FLL Teams (5 weekly)
• Ghana FTC (monthly)
• All Saints NJ (monthly)
• Senior Center (ongoing)
• FDAVII STEM Lab (weekly)
Student 
Leadership: 
100% Student-Led 
Outreach
Initiated by:
• Current Teammates — 
Majority
• Alumni — Limited 
portion
From earlier Connect 
analysis:
76% Current Student 
Initiated
24% Alumni Initiated
Quantified Impact
01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 Reach
01110011 01110100 01111001 01101001 01101001


## Page 20

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 Control
01110011 01110100 01111001 01101001 01101001 
Analyze Task: 
Maximize scoring efficiency by:
• Accurate localization
• Stable auto-aim
• Consistent launch velocity
• Fast cycle timing
• Seamless Auto → TeleOp 
transition
Constraints: Control Strategy: 
• 30-sec autonomous limit
• Battery voltage drop during 
matches
• Odometry drift
• Motion under acceleration
• Speed vs accuracy 
tradeo
ff
• Single-driver operation
• Sensor-based localization (Odometry + 
IMU + AprilTags)
• Closed-loop PID control (Turret + 
Flywheel + Drive)
• Modular state machine architecture
• Continuous feedback correction
• Data carryover from Auto → TeleOp
• Driver abstraction (software handles 
sequencing)
Control Systems
Sensor → Model → PID → Motor → Sensor
Sensors Used:
• Odometry Pods (10ms updates)
• Limelight 3A (AprilTag vision)
• IMU
• Motor encoders
• Transfer motor current sensing
• Color sensors (sorting)
Architecture: 
Key Innovations: 
Custom Pathing Engine (Peregrine 
replacement)
Infinite Variable Calculus Modeling
Modular Autonomous Functions
Auto-Aim Independent of 
Drivetrain
Velocity Recovery Optimization
Nonlinear Joystick Mapping
Quantified Performance Metrics: 
Autonomous:
• 9-ball auto (Close + Far)
• Path deviation reduced to ± 0.2 cm
• Auto path completion time: ___ sec
TeleOp:
• 15 cycles per match
• 3 artifacts per cycle
• 45 artifacts max
• 195 points potential
Control Precision:
• Launch RPM maintained ± ___%
• Turret correction every 50ms
• 75ms release timing
• 10ms odometry updates
Reliability:
• 98% AprilTag lock reliability
• 100% odometry data availability
Iteration 1:
 Hardcoded paths
 No localization
 No auto-aim
Iteration 2:
✓ PID straight-line correction
✓ Sensor integration
✓ Partial auto-aim
Iteration 3:
✓ AprilTag localization
✓ State carryover
✓ Optimized velocity recovery
Measured improvements across 
iterations:
• Localization error ↓ 30%
• RPM variance ↓ 30%
• Cycle 150 ↓ 30%
Engineering Process: 
Auto v.s. Teleop: 
Autonomous:
• Predictive pathing
• Sensor-based aim
• State machine execution
TeleOp:
• Continuous auto-aim correction
• RPM stabilization
• Driver-level abstraction
Launch Regression:
1. External data from 
odometry → location 
on the field
2. Distance from goal 
calculated using 
distance formula
3. Distance attributed 
to launcher velocity 
using the equation 
v = d • 2.64 + 1013
4. Automatic, 
continuous 
adjustment without 
driver input
Number of trials: 200
Successful shots: 189
Misses: 11


## Page 21

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 Design 
Analyze Task:
Building a robot that:
1) Intakes 3 artifacts at once
2) Sorts and stores artifacts 
efficiently
3) Rapid-fires into the launcher
4) Maintains accuracy at close and 
far zones
5) Minimizes cycle time
6) Balances weight and durability
Strategy：
- Modular subsystem 
- Integrated sorting & 
transfer system
- Optimized arc-ramp 
geometry
- Adjustable-angle launcher
- 2-ratio turret system
- Iterative prototype 
testing(rookie-built)
Bumpers
Polycarbonate bumpers 
increase static & 
collision resistance
3-Artifact Intake
Intakes three artifacts 
simultaneously.
Adjustable Launcher
Launches artifacts from 
any range using a 
flywheel. 
Turret
Automatically-aiming
turret for precise 
shooting
• Identify Constraints
• 
Collaborative . . .
• ……… Before each sprint we 
collaborate to set goals, 
strategy, and timelines
SET GOALS & STRATEGY BRAINSTORM & SKETCH IDEAS
SOFTWARE
Design entire robot 
based on ideation 
and input
CAD MODELING
COMPUTATIONAL OPTIMIZATION TEST EFFICACY & ITERATE FABRICATE PROTOTYPE
Prototyping
Rookie-led
manufacturing of 
the robot from 
CAD
Use modularity to 
iterate quickly
Test + Video physics
Collect data
Controlled, 
repeatable, accurate
testing
• Materials Selection
• Risk Management
Design Process
Robot (Monty) Overview
Iteration & Testing: 
Iteration 1:
 Flat ramp → random artifact position
 Left-sided hole → slow transfer
 No turret
 Excess rails → high weight
Iteration 2:
✓ Vectoring slots added
✓ Two-rail system
✓ Adjustable system integrated
✓ Smaller wheel → lower weight
Iteration 3:
✓ Centered hole → shorter path
✓ Shortened vectoring slots
✓ Intake repositioned to prevent 
dual jams
✓ Rubber bands replaced gecko 
wheels
Measured Improvements:
• Transfer time ↓ ___%
• Intake consistency ↑ ___%
• Weight ↓ ___%
• Jam rate ↓ ___%
Documentation: 
• Master sketches
• CAD revision tracking
• Iteration logs
• Failure analysis
• Quantified prototype comparison


## Page 22

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 
Innovate
V1 evaluation: 
Rapid-Fire Transfer System: 
• Arc-shaped ramp geometry
• Shortened path via centered hole
• Current sensing for clog detection
V2 evaluation: 
V3 evaluation: 
• Prestages artifacts automatically
• Controlled feed spacing (75ms release)
3-Wide Active Band Intake:
Integrated Sorting 
& Storage: 
97% intake rate intake ⟶ launcher 5s time
Prototype 2:
✓ Vectoring slots ✓ Dual rail control
85% intake rate
intake ⟶ launcher 7s time
 Flat ramp → random positioning
 Off-center transfer → longer path
100% intake rate
2s
Prototype 3:
✓ Centered transfer ✓ Rubber-band grip
✓ Jam mitigation through intake repositioning
intake ⟶ launcher 
time
• Intakes 3 artifacts simultaneously
• Rubber-band grip for consistent traction
• Vectoring geometry to guide position
• Adjustable hood
• Backspin reduction
• Velocity PID stabilization
Launcher Optimizations: 
Innovate Problem: 
Standard intake + launcher systems:
• Intake one artifact at a time
• Require repositioning between shots
• Lose time during transfer
• Separate intake and storage 
subsystems
Game challenge required:
Fast multi-artifact scoring with minimal 
cycle time.
Constraints:
• Artifact variability
• Jam risk with 
multi-intake
• Transfer speed 
bottlenecks
• Limited robot footprint
• Launcher consistency 
under load
Innovation Strategy:
Integrate intake, storage, 
sorting, and transfer into one 
compact, modular subsystem 
capable of:
● Simultaneous 3-artifact 
intake
● Prestaging for rapid fire
● Controlled velocity transfer
● Minimal driver intervention
What Makes it Innovative?
Innovation: 
The compact integration of 
intake + sorting + storage + 
transfer into one 
synchronized subsystem, 
most teams separate these.
Quantified Advantage: 
• 3 artifacts per intake cycle
• 15 cycles per teleop
• 45 artifacts max
• 75ms inter-shot spacing
• Transfer path shortened by 50%
• Jam rate reduced 80%
Engineering 
Principles Applied: 
• Friction modeling
• Force distribution
• Path length optimization
• Compression tuning
• Compact subsystem integration
The Innovation


## Page 23

01000100 01100101 01110011 
01101001 01100111 01101110 
00100000 01110000 01110010 
01101111 01100011 01100101 
01110011 01110011 01110011 
01110011
01000100 01100101 01110011 
01101001 01100111 01101110 
00100000 01110000
01000100 01100101 01110011 
01101001 01100111 01101110 
00100000 01110000 
01000100 01100101 01110011 
01101001 
01000100 01100101 01110011 01101001 01100111 01101110 00100000 
01110000 01110010 01101111 01100011 01100101 01110011 01110011 
01110011 01110011
01000100 01100101 01110011 01101001 01100111 01101110 00100000 
01110000 
Design
CAD & 
COMPUTATIONAL 
OPTIMIZATION
EVALUATE EFFICACY 
COLLABORATIVE 
IDEATION
FABRICATE 
PROTOTYPE OR 
ITERATION
SET GOALS FOR 
NEXT SPRINT
Challenge: Integrating subsystems 
to allow for seamless intake, storage, 
and sorting.
Solution: A band controlled active 
three artifact wide, capable intaking 3 
artifacts at once, storage, and sorting, 
within one compact subsystem.
Intake inspired by the 
intake mechanism of the 
Clearbot Robotics 
Alligator Robot which has 
an active intake that 
leads into a conveyor 
belt. 
Design entire robot
based on ideation and 
input. Use computer 
simulation to analyze
design.
design 
features: 
Testing + Video physics to
collect data.
Controlled, repeatable, 
accurate testing.
Rookie-led
manufacturing of the 
robot from CAD
Use modularity to iterate 
quickly.
Introducing 
Montyç
Plan and Re-evaluate
current design.
Create Gantt chart for 
plan, synchronizing every 
subteam.
OLD VERSION/ use to
pull images


## Page 24

01000100 01100101 01110011 01101001 01100111 01101110 00100000 
01110000 01110010 01101111 01100011 01100101 01110011 01110011 
01110011 01110011 01000100 01100101 01110011 01101001 01100111 
Innovate
V1 evaluation: 
Rapid-Fire Transfer System: 
• Arc-shaped ramp geometry
• Shortened path via centered hole
• Current sensing for clog detection
V2 evaluation: 
V3 evaluation: 
• Prestages artifacts automatically
• Controlled feed spacing (75ms release)
3-Wide Active Band Intake:
Integrated Sorting 
& Storage: 
97% intake rate intake ⟶ launcher 5s time
Prototype 2:
✓ Vectoring slots ✓ Dual rail control
85% intake rate
intake ⟶ launcher 7s time
 Flat ramp → random positioning
 Off-center transfer → longer path
100% intake rate
2s
Prototype 3:
✓ Centered transfer ✓ Rubber-band grip
✓ Jam mitigation through intake repositioning
intake ⟶ launcher 
time
The Innovation
• Intakes 3 artifacts simultaneously
• Rubber-band grip for consistent traction
• Vectoring geometry to guide position
• Adjustable hood
• Backspin reduction
• Velocity PID stabilization
Launcher Optimizations: 
Innovate Problem: 
Standard intake + launcher systems:
• Intake one artifact at a time
• Require repositioning between shots
• Lose time during transfer
• Separate intake and storage 
subsystems
Game challenge required:
Fast multi-artifact scoring with minimal 
cycle time.
Constraints:
• Artifact variability
• Jam risk with 
multi-intake
• Transfer speed 
bottlenecks
• Limited robot footprint
• Launcher consistency 
under load
Innovation Strategy:
Integrate intake, storage, 
sorting, and transfer into one 
compact, modular subsystem 
capable of:
● Simultaneous 3-artifact 
intake
● Prestaging for rapid fire
● Controlled velocity transfer
● Minimal driver intervention
What Makes it Innovative?
Innovation: 
The compact integration 
of intake + sorting + 
storage + transfer into 
one synchronized 
subsystem, most teams 
separate these.
Quantified Advantage: 
• 3 artifacts per intake cycle
• 15 cycles per teleop
• 45 artifacts max
• 75ms inter-shot spacing
• Transfer path shortened by ___%
• Jam rate reduced ___%
Engineering 
Principles Applied: 
• Friction modeling - applied 
where
• Force distribution
• Path length optimization
• Compression tuning
• Compact subsystem 
integration


## Page 25

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 
01110011 01110100 01111001 01101001 01101001 
01101001
01110011 01110100 01111001 01111001
Sustainability
INSERT CANVAS 
TRACKING APP CODE 
PHOTO & DESCRIPTION
Supplies $2,000 $1,701 $299
Equipment $400 $189 $211
Apparel $120 $0 $120
SUBTOTAL $2,520 $1,890 $630
INSERT CANVAS 
TRACKING APP CODE 
PHOTO & DESCRIPTION
Progress Tracking Financial Plan
-Custom Gantt Chart
• Guide rookie skills & processes
• Coordinate small tasks across subteams
• Connect with experts & document growth
Outreach & Communications
• Plan & execute an outreach event
• Document, present & answer Judge Qs 
• Share build & expert updates with team
Electrical & Control Systems
• Budget basics & resource planning
• Team-building & collaborative 
strategy
• Support pit-crew & challenge 
strategy 
Team Operations
Build Fundamentals Mentor & Lead
• Wiring, power flow, & troubleshooting
• FTC coding foundations
• Contribute to tele-op or autonomous code
• Design → CAD → fabricate → document
• Test, analyze, & iterate with purpose
• Complete one functional part or subsystem
• Safe tool use & rapid prototypes
• Materials basics & shop workflow
• Guided hands-on builds 
Component Engineering
Neptune
MicroFunding
We organized a MicroFunding effort to raise money for a local robotics team by reaching out to 
FTC and FRC teams for donations. The purpose is to gather small contributions that can 
collectively help support robotics education, including providing equipment, learning 
opportunities, and teamwork-based STEM activities for students interested in engineering and 
problem solving.


## Page 26

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 Connect
01110011 01110100 01111001 01101001 01101001 
Our Goals
Reach out to experts in growth 
areas IDed in SWOT Chart. 
Re-connected with former mentors, 
experts, and experienced alumni.
Set meetings & learn as a 
team.
HARDWARE & RELIABILITY: 
Force, friction, breakage, 
durability)
9 Technical Experts
Alex McCoy — Torque & Force
Long Wang — Sensor Integration
Dr. Luis Martin — Applied Physics
Warren Tappe — Mechanical 
Systems
Krassimir Marchev — Structural 
Modeling
Oscar Elizalde — Materials
Ben Reydel — Durability
Carlos Lopez — Launch Dynamics
Benjamin Jorn — Stability
Why We Connected
• Reduce friction and breakage
• Improve material selection
• Increase structural durability
• Improve force management in 
launcher
What We Learned
• Torque distribution under load
• Friction reduction methods
• Material differences under stress
• Centrifugal effects on launch 
consistency
How We Applied It
• Reduced friction in transfer 
system
• Reinforced high-load components
• Improved material choice in 
intake
• Increased repeatability under 
match stress Alex McCoy
→ Learned: Torque & force
→ Applied: Reduced friction to 
minimize breakage
Alexander Gendell
→ Learned: Subtractive 
manufacturing
→ Applied: Final CNC parts with 
minimal tolerance error
Long Wang
→ Learned: Sensor integration for 
force detection
→ Applied: Launcher speed 
adjustment


## Page 27

01000100 01100101 01110011 01101001 01100111 01101110 00100000 01110000 
01110010 01101111 01100011 01100101 01110011 01110011 01110011 01110011
01000100 01100101 01110011 01101001 01100111 01110011 01101001 01100111 
01110011 01101001 01100111 01110011 01110011 01101001 01100111 01110011 
Design
• Identify Constraints
• 
Collaborative . . .
• ………
Before each sprint we collaborate to set goals, 
strategy, and timelines
SET GOALS & STRATEGY BRAINSTORM & SKETCH IDEAS
SOFTWARE
Design entire robot 
based on ideation and 
input
CAD MODELING
COMPUTATIONAL OPTIMIZATION TEST EFFICACY & ITERATE FABRICATE PROTOTYPE
Prototyping
Rookie-led
manufacturing of the 
robot from CAD
Use modularity to 
iterate quickly
Test + Video physics
Collect data
Controlled, 
repeatable, accurate
testing
• Materials Selection
• Risk Management


## Page 28

01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 Control
01110011 01110100 01111001 01101001 01101001 
Projectile Launching
We used kinematic equations and trigonometry to 
calculate a low, efficient launch path into the goal. Our 
algorithm works whether the robot is moving or 
stationary, and can be improved by reducing 
computation time to increase accuracy.
Autonomous Path Generations
Robot path generation is 
often overlooked, so we built 
an algorithm that finds the 
fastest optimal path and 
studied advanced 
optimization methods with a 
Simons Foundation PhD 
researcher.


## Page 29

We are currently working on adding robotics to the 
curriculum 
Taught bike-repair mechanical engineering skills to 20+ 
kids at FreeCycles in Missoula, MT
Hour of Code
Fostering a love for coding in elementary school kids 
through interactive lessons.
Blackfoot Collaboration
Collaborated with Blackfoot 8th graders at, introducing 
robotics and STEM opportunities and scholarships.
Ghana Workshops
Conducted monthly FTC workshops at 
Accra High School in Ghana, sharing 
lessons from our experience.
All Saints Episcopal day school
Free Cycles
01110011 01110101 01110011 01110100 01100001 
01101001 01101110 01100001 01100010 01101001 Reach
01110011 01110100 01111001 01101001 01101001


## Page 30

01000100 01100101 01110011 01101001 01100111 01101110 00100000 
01110000 01110010 01101111 01100011 01100101 01110011 01110011 
01110011 01110011 01000100 01100101 01110011 01101001 01100111 
01101110 00100000 01110000 01110010 01101111 01100011 01100101 
Reach
Analyze Task: 
Expanded access to FIRST,
robotics, and STEM by:
• Recruiting new teams and 
members
• Mentoring FTC/FLL teams
• Publishing open resources
• Teaching STEM in underserved 
and international communities
Constraints:
• Limited student time during 
build season
• Geographic distance 
(international teams)
• Varying age groups (K–12 →
adults)
• Resource access gaps 
(materials, curriculum, code)
• Maintaining long-term 
engagement
Reach Strategy:
• Combine high-scale curriculum 
with high-touch mentoring
• Prioritize sustainable
relationships (weekly/monthly)
• Open-source tools to scale 
beyond in-person events
• Target diversity & international 
expansion
• Track hours, volunteers, audience 
size, and follow-up
Quantified Impact 
Organizations Engaged: 
Includes:
• K–8 Schools e.g. All Saints Episcopal Day School 
• High Schools e.g. Regis, Saint Peters, Hoboken High
• FTC / FRC Teams e.g. Tic Tac Tech, Roboctopus, Dynamic
• FLL Teams (5 mentored weekly)
• Nonprofits e.g. FreeCycles, Hudson Guild
• International teams e.g. Ghana, Philippines
• Senior Centers
• STEM labs
Total Outreach Hours: 
500+ Hours of Direct Outreach
≈ 500+ volunteer hours logged
(Several long-term weekly 
engagements: 41–50 hr blocks, 
126–150 hr project, 100–125 hr camp)
≈ 35+ unique organizations
People Reached: 
10,000+ Individuals 
Impacted
Large-scale:
• Curriculum: 5,001–10,000 
potential reach
• Instagram: 1,001–5,000
• Media outreach: 
1,001–5,000
Direct instruction / events:
• 201–300 (Hour of Code)
• 150–200 (Open Houses)
• 76–100 (Demo events)
• 20–50 repeated 
small-group mentoring
Teams Directly Mentored: 
12+ FIRST Teams Mentored or Created
• 5 FLL Teams (weekly)
• 6+ FTC Teams mentored
• 1 FTC team created (Tic Tac Tech (made cities))
• 1 FLL program built (Blackfleet)
• MicroFunding support to FRC + FTC
Sustained Engagement: 
60%+ Multi-Session Engagements
Weekly or Monthly programs:
• FLL Teams (5 weekly)
• Ghana FTC (monthly)
• All Saints NJ (monthly)
• Senior Center (ongoing)
• FDAVII STEM Lab (weekly)
CHART/GRAPH HERE MAYBE?
Student 
Leadership: 
100% Student-Led 
Outreach
Initiated by:
• Current Teammates — 
Majority
• Alumni — Limited 
portion
From earlier Connect 
analysis:
76% Current Student 
Initiated
24% Alumni Initiated
