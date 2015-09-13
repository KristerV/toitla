<!-- Immediate -->
* email kokale, email uus tellimus
* koka regamise vorm

<!-- Important -->
* Tracking
* sünnipäevalaua orienteeritud - catering on üks linnuke, hind kaob ära
* grid system
* kokale saates muutub status phase ise 'kokad pakuvad'
* Tellimuse esitades ei suuna kohe indexile vaid näitab kirja ja alles siis.
* notificationile klikk võiks minna otse tellimuse sisse
* koka overview on segane. Parem oleks [uus, ootab kinnitust, kinnitatud, tehtud]
* manageriks saab lisada admin
* back lõpuks läheks äpist välja
* kokkadele statistikat


# ROLES
# LOCKS
# NOTIFICATIONS
* TESTS

# PROFIIL
# 	nimi
# 	asukoht
# 	email
# 	telefon
# 	vet
# 	billing
	<!-- kaart asukohaga -->
  <!--
  pilt
	kirjeldus
	oskused
	[rating]
	[tehtud tellimused] -->

# OVERVIEW MANAGER KOKK
	<!-- .class-1 kui vajab tähelepanu, .class-2 kui lähedal -->

# ORDER
	<!--
	notes MANAGER
	Tagasiside TELLIJA
		rating
		tekst
	Feed KOKK TELLIJA MANAGER
		message
		pinned (show pinnitud ja 3 kõige uuemat)
		createdAt
		createdBy
	Järgmise tegevuse kuupäev ja kirjeldus
	Pakenditele järgi mindud
	Actions
		send to client - offer (arvega)
		send to client - feedback -->

# Suborder
#		CreatedAt
#		Detailid
#     Inimesi
#			allergiad
#			Hind
#			Aeg
#			Sisu
#			Organisatsioon
#		currentChefId
#		Kokk
#			chefId
#			sentAt
		* receivedAt
		* seenAt
# 		repliedAt
# 		result
# 		Kirjeldus
# 		Koostisosad
#   Actions
#			Offer to chef
#			push notification
		<!-- Logistika KOKK MANAGER DRIVER
			(Asukoht)
			Järgi minemise aeg
			Järgi mineja
			Märkmed
		Tagasside TELLIJA
			rating
			tekst -->

# CHEF LIST
# 	name
# 	online_idle_offline
# 	lastReplyToThisOffer
