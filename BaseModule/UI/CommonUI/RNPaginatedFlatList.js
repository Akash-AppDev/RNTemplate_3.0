import RNRefreshControl from './RNRefreshControl';
import React, { useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';

/**
 * Sample Template
 <RNPaginatedFlatList
    screenName={screenName}
    id={}
    keyExtractor={}
    data={}
    renderItem={}
    onPageEnd={}
    onRefresh={}
 />
 **/

const RNPaginatedFlatList = (props) => {
    const { screenName, refreshAutomationId, onPageEnd, onRefresh } = props;
    const [refreshing, setRefreshing] = useState(false);

    if (refreshing) {
        setRefreshing(false);
    }
    return (
        <SwipeListView
            {...props}
            onRefresh={null}
            refreshControl={
                <RNRefreshControl
                    screenName={screenName}
                    id={refreshAutomationId}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setRefreshing(true);
                        onRefresh();
                    }}
                />
            }
            onEndReached={onPageEnd}
            onEndReachedThreshold={0.7}
        />
    );
};

export default RNPaginatedFlatList;
