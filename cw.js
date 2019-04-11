
var attacker = firstAttacker;

while (fighter1.health > 0) && (fighter2.health > 0) {
	if (attacker === fighter1.name) {
		fighter2.health -= fighter1.damagePerAttack;
		attacker = fighter2.name;
	} else {
		fighter2.health -= fighter2.damagePerAttack;
		attacker = fighter1.name;
	}
}

if (fighter1.health <= 0) {
	return fighter2.name;
} else if (fighter2.health <= 0) {
	return fighter1.name;
}

function declareWinner(fighter1, fighter2, firstAttacker) {
    switch (firstAttacker) {
      case fighter1.name:
        fighter2.health = fighter2.health - fighter1.damagePerAttack;
        if (fighter2.health > 0) {
          return declareWinner(fighter1, fighter2, fighter2.name);
        } else {
          return fighter1.name;
        }
      case fighter2.name:
        fighter1.health = fighter1.health - fighter2.damagePerAttack;
        if (fighter1.health > 0) {
          return declareWinner(fighter1, fighter2, fighter1.name);
        } else {
          return fighter2.name;
        }
    }
}