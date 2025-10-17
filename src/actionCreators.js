const setUser = (user) => ({
    type: 'setUser',
    payload: user,
})

const setView = (view) => ({
    type: 'setView',
    payload: view,
});

const setShowDeathModal = (show, killer) => ({
    type: 'showDeathModal',
    payload: { show, killer },
})

const setShowGhostModal = (show) => ({
    type: 'showGhostModal',
    payload: show,
})

const setShowMurderSuccess = (show) => ({
    type: 'showMurderSuccess',
    payload: show,
})

const setShowMurderFail = (show) => ({
    type: 'showMurderFail',
    payload: show,
})

export { setUser, setView, setShowDeathModal, setShowGhostModal, setShowMurderSuccess, setShowMurderFail };