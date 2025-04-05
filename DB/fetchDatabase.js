import React, {useEffect, useState} from 'react';

const fetchDatabase = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://192.168.0.112:5005/api/users')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    })
}