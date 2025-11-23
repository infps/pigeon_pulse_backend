import { prisma } from "./lib/prisma";

await prisma.feeScheme.updateMany({
    data:{
        creatorId:1
    }
})

await prisma.bettingScheme.updateMany({
    data:{
        creatorId:1
    }
})

await prisma.events.updateMany({
    data:{
        creatorId:1
    }
})

await prisma.prizeScheme.updateMany({
    data:{
        creatorId:1
    }
})