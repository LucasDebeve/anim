import {Prisma, PrismaClient} from "@prisma/client";
import {faker} from "@faker-js/faker";
import {randomInt} from "node:crypto";

const prisma = new PrismaClient();

const main = async () => {
    const users = [];

    for (let i = 0; i < 10; i++) {
        const user = {
            username: faker.internet.userName(),
            image: faker.image.avatar(),
            name: faker.person.firstName(),
            email: faker.internet.email(),
        } as Prisma.UserUncheckedCreateInput;

        const dbUser = await prisma.user.create({data: user});

        users.push(dbUser);
    }

    const contracts = [
        {
            title: "CDI",
        },
        {
            title: "CDD",
        },
        {
            title: "CEE",
        }
    ];
    const contractsDB = [];

    for (const contract of contracts) {
        const c = await prisma.contract.create({data: contract});
        contractsDB.push(c);
    }

    const offerTypes = [
        {
            title: "Séjour de vacances en France",
        },
        {
            title: "Centre de loisirs",
        },
        {
            title: "Périscolaire",
        },
        {
            title: "Séjour de vacances à l'étranger",
        },
    ];
    const typesDB = [];

    for (const offerType of offerTypes) {
        const t = await prisma.offerType.create({data: offerType});
        typesDB.push(t);
    }

    const organizations = [];

    for (let i = 0; i < 10; i++) {
        const organization = {
            name: faker.company.name(),
            bio: faker.lorem.paragraph(),
            userId: users[faker.number.int({min: 0, max: users.length - 1})].id,
        } as Prisma.OrganizationUncheckedCreateInput;

        const dbOrganization = await prisma.organization.create({data: organization});

        organizations.push(dbOrganization);
    }

    const offers = [];

    for (let i = 0; i < 50; i++) {
        const beginDate = faker.date.recent();
        const endDate = new Date(beginDate.getTime() + faker.number.int({min: 1, max: 30}) * 24 * 60 * 60 * 1000);

        const age_min = faker.number.int({min: 3, max: 14});
        const age_max = faker.number.int({min: age_min, max: 17});

        const offer = {
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            remuneration: faker.number.float({min: 10, max: 40}),
            userId: users[faker.number.int({min: 0, max: users.length - 1})].id,
            organizationId: organizations[faker.number.int({min: 0, max: organizations.length - 1})].id,
            contractId: contractsDB[faker.number.int({min: 0, max: contracts.length - 1})].id,
            offerTypeId: typesDB[faker.number.int({min: 0, max: offerTypes.length - 1})].id,
            beginAt: beginDate,
            endAt: endDate,
            age_min: age_min,
            age_max: age_max,
            city: faker.location.city(),
            postal_code: faker.location.zipCode(),
            country: faker.location.country(),
            interAccepted: faker.number.int({min:0, max: 1}) === 1,
        } as Prisma.OfferUncheckedCreateInput;

        const o = await prisma.offer.create({data: offer});

        offers.push(o);
    }

    const likes = [];
    const tmpLikes: Prisma.LikeUncheckedCreateInput[] = [];

    for (let i = 0; i < 50; i++) {
        const userId = users[faker.number.int({min: 0, max: users.length - 1})].id;
        const offerId = offers[faker.number.int({min: 0, max: offers.length - 1})].id;

        const like = {
            userId,
            offerId,
        } as Prisma.LikeUncheckedCreateInput;

        if (tmpLikes.find(l => l.userId === userId && l.offerId === offerId)) {
            continue;
        }

        tmpLikes.push(like);

        const l = await prisma.like.create({data: like});

        likes.push(l);
    }

    const comments = [];

    for (let i = 0; i < 80; i++) {
        const userId = users[faker.number.int({min: 0, max: users.length - 1})].id;
        const offerId = offers[faker.number.int({min: 0, max: offers.length - 1})].id;

        // Get a random comment with the same offerId
        let parentComment = null;
        if (randomInt(0, 2) === 0) {
            parentComment = comments.find(c => c.offerId === offerId);
        }

        const comment = {
            userId,
            offerId,
            content: faker.lorem.paragraph(),
            parentId: parentComment ? parentComment.id : null,
        } as Prisma.CommentUncheckedCreateInput;

        const c = await prisma.comment.create({data: comment});

        comments.push(c);
    }
};

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});