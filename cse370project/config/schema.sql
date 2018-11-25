DROP TABLE IF EXISTS `nodejs_login`.`users` ;

CREATE TABLE IF NOT EXISTS `nodejs_login`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`careseeker`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nodejs_login`.`careseeker` ;

CREATE TABLE IF NOT EXISTS `nodejs_login`.`careseeker` (
  `seekerid` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `birthdate` DATE NULL,
  `sex` VARCHAR(1) NULL,
  `bloodgroup` VARCHAR(2) NULL,
  PRIMARY KEY (`seekerid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`diagnosis`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nodejs_login`.`diagnosis` ;

CREATE TABLE IF NOT EXISTS `nodejs_login`.`diagnosis` (
  `diagnoid` INT NOT NULL AUTO_INCREMENT,
  `diagnoname` VARCHAR(255) NULL,
  `diagnodate` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `users_id` INT NOT NULL,
  `careseeker_seekerid` INT NOT NULL,
  PRIMARY KEY (`diagnoid`, `users_id`, `careseeker_seekerid`),
  INDEX `fk_diagnosis_users1_idx` (`users_id` ASC),
  INDEX `fk_diagnosis_careseeker1_idx` (`careseeker_seekerid` ASC),
  CONSTRAINT `fk_diagnosis_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `nodejs_login`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_diagnosis_careseeker1`
    FOREIGN KEY (`careseeker_seekerid`)
    REFERENCES `nodejs_login`.`careseeker` (`seekerid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`prescription`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `nodejs_login`.`prescription` ;

CREATE TABLE IF NOT EXISTS `nodejs_login`.`prescription` (
  `presid` INT NOT NULL AUTO_INCREMENT,
  `presdata` LONGTEXT NULL,
  `presdate` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `diagnosis_diagnoid` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`presid`, `diagnosis_diagnoid`, `users_id`),
  INDEX `fk_prescription_diagnosis_idx` (`diagnosis_diagnoid` ASC) ,
  INDEX `fk_prescription_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_prescription_diagnosis`
    FOREIGN KEY (`diagnosis_diagnoid`)
    REFERENCES `nodejs_login`.`diagnosis` (`diagnoid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prescription_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `nodejs_login`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
